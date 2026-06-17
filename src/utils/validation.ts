import type { TFunction } from 'i18next';
import type { EasyTierConfig } from '../types/config';

export interface FieldValidationError {
  key: string;
  values?: Record<string, string>;
}

export interface ValidationIssue {
  field: string;
  error: FieldValidationError;
}

function fieldError(key: string, values?: Record<string, string>): FieldValidationError {
  return { key, values };
}

function parseIpv4Address(value: string): number | undefined {
  const parts = value.split('.');
  if (parts.length !== 4) return undefined;

  let address = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return undefined;
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) return undefined;
    address = address * 256 + octet;
  }

  return address;
}

function formatIpv4Address(value: number): string {
  return [
    Math.floor(value / 256 ** 3) % 256,
    Math.floor(value / 256 ** 2) % 256,
    Math.floor(value / 256) % 256,
    value % 256,
  ].join('.');
}

function parsePort(value: string): number | undefined {
  if (!/^\d+$/.test(value)) return undefined;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 0 || port > 65535) return undefined;
  return port;
}

function isIpv6Address(value: string): boolean {
  return value.includes(':') && /^[0-9a-fA-F:.]+$/.test(value);
}

export function normalizeIpv4Cidr(value: string): string | undefined {
  const [rawAddress, rawPrefix, extra] = value.trim().split('/');
  if (extra !== undefined || rawPrefix === undefined) return undefined;

  const address = parseIpv4Address(rawAddress);
  const prefix = Number(rawPrefix);
  if (address === undefined || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return undefined;

  const blockSize = 2 ** (32 - prefix);
  const network = Math.floor(address / blockSize) * blockSize;
  return `${formatIpv4Address(network)}/${prefix}`;
}

export function validateRequired(value: string): FieldValidationError | undefined {
  return value.trim() ? undefined : fieldError('requiredField');
}

export function validateIpv4CidrStrict(value: string): FieldValidationError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const normalized = normalizeIpv4Cidr(trimmed);
  if (!normalized) return fieldError('invalidIpv4Cidr');
  if (normalized !== trimmed) {
    return fieldError('cidrHostBitsMustBeZero', { suggestion: normalized });
  }
  return undefined;
}

export function validateIpv4Inet(value: string): FieldValidationError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const [rawAddress, rawPrefix, extra] = trimmed.split('/');
  if (extra !== undefined) return fieldError('invalidIpv4Address');
  if (parseIpv4Address(rawAddress) === undefined) return fieldError('invalidIpv4Address');
  if (rawPrefix === undefined) return undefined;

  const prefix = Number(rawPrefix);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return fieldError('invalidIpv4Address');
  return undefined;
}

export function validateIpAddr(value: string): FieldValidationError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (parseIpv4Address(trimmed) !== undefined || isIpv6Address(trimmed)) return undefined;
  return fieldError('invalidIpAddress');
}

export function validateSocketAddr(value: string): FieldValidationError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith('[')) {
    const close = trimmed.indexOf(']');
    if (close <= 1 || trimmed[close + 1] !== ':') return fieldError('invalidSocketAddr');
    const host = trimmed.slice(1, close);
    const port = trimmed.slice(close + 2);
    if (!isIpv6Address(host) || parsePort(port) === undefined) return fieldError('invalidSocketAddr');
    return undefined;
  }

  const separator = trimmed.lastIndexOf(':');
  if (separator <= 0 || separator !== trimmed.indexOf(':')) return fieldError('invalidSocketAddr');

  const host = trimmed.slice(0, separator);
  const port = trimmed.slice(separator + 1);
  if (parseIpv4Address(host) === undefined || parsePort(port) === undefined) return fieldError('invalidSocketAddr');
  return undefined;
}

export function validateUrl(value: string): FieldValidationError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  try {
    const url = new URL(trimmed);
    if (!url.protocol || !url.hostname) return fieldError('invalidUrl');
    return undefined;
  } catch {
    return fieldError('invalidUrl');
  }
}

export function formatValidationError(
  error: FieldValidationError | undefined,
  t: TFunction,
): string | undefined {
  if (!error) return undefined;
  return String(t(error.key, error.values));
}

export function formatValidationIssue(issue: ValidationIssue, t: TFunction): string {
  return `${issue.field}: ${formatValidationError(issue.error, t) ?? ''}`;
}

export function validateConfig(config: EasyTierConfig): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const add = (field: string, error: FieldValidationError | undefined) => {
    if (error) issues.push({ field, error });
  };

  add('network_identity.network_name', validateRequired(config.network_identity?.network_name ?? ''));

  if (config.dhcp === false) {
    const ipv4 = config.ipv4 ?? '';
    add('ipv4', validateRequired(ipv4) ?? validateIpv4Inet(ipv4));
  } else if (config.ipv4) {
    add('ipv4', validateIpv4Inet(config.ipv4));
  }

  config.peers?.forEach((peer, index) => add(`peer[${index}].uri`, validateUrl(peer.uri)));
  config.listeners?.forEach((listener, index) => add(`listeners[${index}]`, validateUrl(listener)));
  config.mapped_listeners?.forEach((listener, index) => add(`mapped_listeners[${index}]`, validateUrl(listener)));
  config.proxy_networks?.forEach((network, index) => {
    add(`proxy_network[${index}].cidr`, validateIpv4CidrStrict(network.cidr));
    if (network.mapped_cidr) add(`proxy_network[${index}].mapped_cidr`, validateIpv4CidrStrict(network.mapped_cidr));
  });
  config.routes?.forEach((route, index) => add(`routes[${index}]`, validateIpv4CidrStrict(route)));
  config.exit_nodes?.forEach((node, index) => add(`exit_nodes[${index}]`, validateIpAddr(node)));

  if (config.vpn_portal) {
    add(
      'vpn_portal_config.client_cidr',
      validateRequired(config.vpn_portal.client_cidr) ?? validateIpv4CidrStrict(config.vpn_portal.client_cidr),
    );
    add(
      'vpn_portal_config.wireguard_listen',
      validateRequired(config.vpn_portal.wireguard_listen) ?? validateSocketAddr(config.vpn_portal.wireguard_listen),
    );
  }

  config.port_forwards?.forEach((forward, index) => {
    add(
      `port_forward[${index}].bind_addr`,
      validateRequired(forward.bind_addr) ?? validateSocketAddr(forward.bind_addr),
    );
    add(
      `port_forward[${index}].dst_addr`,
      validateRequired(forward.dst_addr) ?? validateSocketAddr(forward.dst_addr),
    );
  });

  return issues;
}
