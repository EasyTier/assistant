import TOML from 'smol-toml';
import type { EasyTierConfig } from '../types/config';
import { easytierDefaults } from '../types/config';

function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => isEqual(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ak = Object.keys(a as object);
    const bk = Object.keys(b as object);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => isEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

export function generateToml(config: EasyTierConfig): string {
  const obj: Record<string, unknown> = Object.create(null);

  // Basic fields
  if (config.instance_name !== undefined && config.instance_name !== easytierDefaults.instance_name)
    obj.instance_name = config.instance_name;
  if (config.hostname !== undefined && config.hostname !== easytierDefaults.hostname)
    obj.hostname = config.hostname;
  if (config.ipv4 !== undefined && config.ipv4 !== easytierDefaults.ipv4)
    obj.ipv4 = config.ipv4;
  if (config.ipv6 !== undefined && config.ipv6 !== easytierDefaults.ipv6)
    obj.ipv6 = config.ipv6;
  if (config.dhcp !== undefined && config.dhcp !== easytierDefaults.dhcp)
    obj.dhcp = config.dhcp;
  if (config.ipv6_public_addr_provider !== undefined && config.ipv6_public_addr_provider !== easytierDefaults.ipv6_public_addr_provider)
    obj.ipv6_public_addr_provider = config.ipv6_public_addr_provider;
  if (config.ipv6_public_addr_auto !== undefined && config.ipv6_public_addr_auto !== easytierDefaults.ipv6_public_addr_auto)
    obj.ipv6_public_addr_auto = config.ipv6_public_addr_auto;
  if (config.ipv6_public_addr_prefix !== undefined && config.ipv6_public_addr_prefix !== easytierDefaults.ipv6_public_addr_prefix)
    obj.ipv6_public_addr_prefix = config.ipv6_public_addr_prefix;

  // Network identity
  if (config.network_identity) {
    const ni = config.network_identity;
    const defaultNi = easytierDefaults.network_identity;
    if (ni.network_name !== defaultNi.network_name || ni.network_secret !== defaultNi.network_secret) {
      obj.network_identity = {
        network_name: ni.network_name,
        ...(ni.network_secret !== defaultNi.network_secret && { network_secret: ni.network_secret }),
      };
    }
  }

  // Listeners
  if (config.listeners && config.listeners.length > 0 && !isEqual(config.listeners, easytierDefaults.listeners)) {
    obj.listeners = config.listeners;
  }

  // Mapped listeners
  if (config.mapped_listeners && config.mapped_listeners.length > 0 && !isEqual(config.mapped_listeners, easytierDefaults.mapped_listeners)) {
    obj.mapped_listeners = config.mapped_listeners;
  }

  // Peers
  if (config.peers && config.peers.length > 0 && !isEqual(config.peers, easytierDefaults.peers)) {
    obj.peer = config.peers;
  }

  // Exit nodes
  if (config.exit_nodes && config.exit_nodes.length > 0 && !isEqual(config.exit_nodes, easytierDefaults.exit_nodes)) {
    obj.exit_nodes = config.exit_nodes;
  }

  // Routes
  if (config.routes && config.routes.length > 0 && !isEqual(config.routes, easytierDefaults.routes)) {
    obj.routes = config.routes;
  }

  // Proxy networks
  if (config.proxy_networks && config.proxy_networks.length > 0 && !isEqual(config.proxy_networks, easytierDefaults.proxy_networks)) {
    obj.proxy_network = config.proxy_networks;
  }

  // VPN portal
  if (config.vpn_portal && !isEqual(config.vpn_portal, easytierDefaults.vpn_portal)) {
    obj.vpn_portal_config = config.vpn_portal;
  }

  // Port forwards
  if (config.port_forwards && config.port_forwards.length > 0 && !isEqual(config.port_forwards, easytierDefaults.port_forwards)) {
    obj.port_forward = config.port_forwards;
  }

  // Flags — compare each flag individually against its default
  if (config.flags && Object.keys(config.flags).length > 0) {
    const flags: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(config.flags)) {
      if (value === undefined) continue;
      const defaultValue = easytierDefaults.flags[key];
      if (!isEqual(value, defaultValue)) {
        flags[key] = value;
      }
    }
    if (Object.keys(flags).length > 0) {
      obj.flags = flags;
    }
  }

  // Loggers
  if (config.file_logger && !isEqual(config.file_logger, easytierDefaults.file_logger)) {
    obj.file_logger = config.file_logger;
  }
  if (config.console_logger && !isEqual(config.console_logger, easytierDefaults.console_logger)) {
    obj.console_logger = config.console_logger;
  }

  return TOML.stringify(obj);
}

export function downloadToml(config: EasyTierConfig, filename = 'easytier-config.toml') {
  const toml = generateToml(config);
  const blob = new Blob([toml], { type: 'text/toml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
