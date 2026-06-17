import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';
import { Select } from '../common/Select';

const U64_MAX = 18446744073709551615n;

export function SectionAdvanced() {
  const { t } = useTranslation();
  const { config, updateFlags } = useConfig();
  const flags = config.flags ?? {};

  const setFlag = (key: string, value: string | number | boolean | bigint) => {
    updateFlags({ [key]: value });
  };

  const getLimitValue = (key: string) => {
    const value = flags[key];
    if (typeof value === 'bigint') return value === U64_MAX ? '' : value.toString();
    if (typeof value === 'number') return value.toString();
    return '';
  };

  const setLimitFlag = (key: string, value: string) => {
    const trimmed = value.trim();
    if (trimmed === '') {
      setFlag(key, U64_MAX);
      return;
    }
    if (/^\d+$/.test(trimmed)) {
      setFlag(key, BigInt(trimmed));
    }
  };

  return (
    <section id="advanced" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('advancedOptions')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('defaultProtocol')} htmlFor="def-proto">
          <Select
            id="def-proto"
            value={(flags.default_protocol as string) ?? 'tcp'}
            options={[
              { value: 'tcp', label: 'TCP' },
              { value: 'udp', label: 'UDP' },
              { value: 'ws', label: 'WebSocket' },
              { value: 'wss', label: 'WSS' },
              { value: 'quic', label: 'QUIC' },
            ]}
            onChange={(v) => setFlag('default_protocol', v)}
          />
        </FormField>

        <FormField label={t('encryptionAlgorithm')} htmlFor="enc-algo">
          <Select
            id="enc-algo"
            value={(flags.encryption_algorithm as string) ?? 'aes-gcm'}
            options={[
              { value: 'aes-gcm', label: 'AES-GCM' },
              { value: 'aes-256-gcm', label: 'AES-256-GCM' },
              { value: 'chacha20', label: 'ChaCha20' },
              { value: 'xor', label: 'XOR' },
            ]}
            onChange={(v) => setFlag('encryption_algorithm', v)}
          />
        </FormField>

        <FormField label={t('mtu')} htmlFor="mtu">
          <input
            id="mtu"
            type="number"
            value={(flags.mtu as number) ?? 1380}
            onChange={(e) => setFlag('mtu', parseInt(e.target.value) || 1380)}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('threadCount')} htmlFor="threads">
          <input
            id="threads"
            type="number"
            value={(flags.multi_thread_count as number) ?? 2}
            onChange={(e) => setFlag('multi_thread_count', parseInt(e.target.value) || 2)}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('compression')} htmlFor="compress">
          <Select
            id="compress"
            value={(flags.data_compress_algo as string) ?? 'none'}
            options={[
              { value: 'none', label: t('none') },
              { value: 'zstd', label: 'Zstd' },
            ]}
            onChange={(v) => setFlag('data_compress_algo', v)}
          />
        </FormField>

        <FormField label={t('tunDeviceName')} htmlFor="dev-name">
          <input
            id="dev-name"
            type="text"
            value={(flags.dev_name as string) ?? ''}
            onChange={(e) => setFlag('dev_name', e.target.value)}
            placeholder={t('leaveEmptyForDefault')}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('relayNetworkWhitelist')} htmlFor="relay-whitelist" description={t('relayNetworkWhitelistDesc')}>
          <input
            id="relay-whitelist"
            type="text"
            value={(flags.relay_network_whitelist as string) ?? '*'}
            onChange={(e) => setFlag('relay_network_whitelist', e.target.value)}
            placeholder="*"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('tldDnsZone')} htmlFor="tld-zone">
          <input
            id="tld-zone"
            type="text"
            value={(flags.tld_dns_zone as string) ?? 'et.net.'}
            onChange={(e) => setFlag('tld_dns_zone', e.target.value)}
            placeholder="et.net."
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('foreignRelayBpsLimit')} htmlFor="foreign-bps" description={t('bpsLimitDesc')}>
          <input
            id="foreign-bps"
            type="text"
            inputMode="numeric"
            value={getLimitValue('foreign_relay_bps_limit')}
            onChange={(e) => setLimitFlag('foreign_relay_bps_limit', e.target.value)}
            placeholder={t('unlimited')}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('instanceRecvBpsLimit')} htmlFor="instance-bps" description={t('bpsLimitDesc')}>
          <input
            id="instance-bps"
            type="text"
            inputMode="numeric"
            value={getLimitValue('instance_recv_bps_limit')}
            onChange={(e) => setLimitFlag('instance_recv_bps_limit', e.target.value)}
            placeholder={t('unlimited')}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Toggle
            id="enc"
            checked={(flags.enable_encryption as boolean) ?? true}
            onChange={(v) => setFlag('enable_encryption', v)}
            label={t('enableEncryption')}
          />
          <Toggle
            id="ipv6"
            checked={(flags.enable_ipv6 as boolean) ?? true}
            onChange={(v) => setFlag('enable_ipv6', v)}
            label={t('enableIpv6')}
          />
          <Toggle
            id="latency"
            checked={(flags.latency_first as boolean) ?? false}
            onChange={(v) => setFlag('latency_first', v)}
            label={t('latencyFirst')}
          />
          <Toggle
            id="exit"
            checked={(flags.enable_exit_node as boolean) ?? false}
            onChange={(v) => setFlag('enable_exit_node', v)}
            label={t('enableExitNode')}
          />
          <Toggle
            id="notun"
            checked={(flags.no_tun as boolean) ?? false}
            onChange={(v) => setFlag('no_tun', v)}
            label={t('disableTun')}
          />
          <Toggle
            id="smoltcp"
            checked={(flags.use_smoltcp as boolean) ?? false}
            onChange={(v) => setFlag('use_smoltcp', v)}
            label={t('useSmoltcp')}
          />
          <Toggle
            id="bind-device"
            checked={(flags.bind_device as boolean) ?? true}
            onChange={(v) => setFlag('bind_device', v)}
            label={t('bindDevice')}
          />
          <Toggle
            id="proxy-forward-system"
            checked={(flags.proxy_forward_by_system as boolean) ?? false}
            onChange={(v) => setFlag('proxy_forward_by_system', v)}
            label={t('proxyForwardBySystem')}
          />
          <Toggle
            id="p2p"
            checked={(flags.disable_p2p as boolean | undefined) !== true}
            onChange={(v) => setFlag('disable_p2p', !v)}
            label={t('enableP2p')}
          />
          <Toggle
            id="p2ponly"
            checked={(flags.p2p_only as boolean) ?? false}
            onChange={(v) => setFlag('p2p_only', v)}
            label={t('p2pOnly')}
          />
          <Toggle
            id="lazy-p2p"
            checked={(flags.lazy_p2p as boolean) ?? false}
            onChange={(v) => setFlag('lazy_p2p', v)}
            label={t('lazyP2p')}
          />
          <Toggle
            id="need-p2p"
            checked={(flags.need_p2p as boolean) ?? false}
            onChange={(v) => setFlag('need_p2p', v)}
            label={t('needP2p')}
          />
          <Toggle
            id="disable-tcp-hole"
            checked={(flags.disable_tcp_hole_punching as boolean) ?? false}
            onChange={(v) => setFlag('disable_tcp_hole_punching', v)}
            label={t('disableTcpHolePunching')}
          />
          <Toggle
            id="disable-udp-hole"
            checked={(flags.disable_udp_hole_punching as boolean) ?? false}
            onChange={(v) => setFlag('disable_udp_hole_punching', v)}
            label={t('disableUdpHolePunching')}
          />
          <Toggle
            id="disable-sym-hole"
            checked={(flags.disable_sym_hole_punching as boolean) ?? false}
            onChange={(v) => setFlag('disable_sym_hole_punching', v)}
            label={t('disableSymHolePunching')}
          />
          <Toggle
            id="upnp"
            checked={(flags.disable_upnp as boolean | undefined) !== true}
            onChange={(v) => setFlag('disable_upnp', !v)}
            label={t('enableUpnp')}
          />
          <Toggle
            id="kcp"
            checked={(flags.enable_kcp_proxy as boolean) ?? false}
            onChange={(v) => setFlag('enable_kcp_proxy', v)}
            label={t('kcpProxy')}
          />
          <Toggle
            id="disable-kcp-input"
            checked={(flags.disable_kcp_input as boolean) ?? false}
            onChange={(v) => setFlag('disable_kcp_input', v)}
            label={t('disableKcpInput')}
          />
          <Toggle
            id="quic"
            checked={(flags.enable_quic_proxy as boolean) ?? false}
            onChange={(v) => setFlag('enable_quic_proxy', v)}
            label={t('quicProxy')}
          />
          <Toggle
            id="disable-quic-input"
            checked={(flags.disable_quic_input as boolean) ?? false}
            onChange={(v) => setFlag('disable_quic_input', v)}
            label={t('disableQuicInput')}
          />
          <Toggle
            id="relay-all-peer-rpc"
            checked={(flags.relay_all_peer_rpc as boolean) ?? false}
            onChange={(v) => setFlag('relay_all_peer_rpc', v)}
            label={t('relayAllPeerRpc')}
          />
          <Toggle
            id="disable-relay-data"
            checked={(flags.disable_relay_data as boolean) ?? false}
            onChange={(v) => setFlag('disable_relay_data', v)}
            label={t('disableRelayData')}
          />
          <Toggle
            id="disable-relay-kcp"
            checked={(flags.disable_relay_kcp as boolean) ?? false}
            onChange={(v) => setFlag('disable_relay_kcp', v)}
            label={t('disableRelayKcp')}
          />
          <Toggle
            id="disable-relay-quic"
            checked={(flags.disable_relay_quic as boolean) ?? false}
            onChange={(v) => setFlag('disable_relay_quic', v)}
            label={t('disableRelayQuic')}
          />
          <Toggle
            id="relay-foreign-kcp"
            checked={(flags.enable_relay_foreign_network_kcp as boolean) ?? false}
            onChange={(v) => setFlag('enable_relay_foreign_network_kcp', v)}
            label={t('enableRelayForeignNetworkKcp')}
          />
          <Toggle
            id="relay-foreign-quic"
            checked={(flags.enable_relay_foreign_network_quic as boolean) ?? false}
            onChange={(v) => setFlag('enable_relay_foreign_network_quic', v)}
            label={t('enableRelayForeignNetworkQuic')}
          />
          <Toggle
            id="dns"
            checked={(flags.accept_dns as boolean) ?? false}
            onChange={(v) => setFlag('accept_dns', v)}
            label={t('magicDns')}
          />
          <Toggle
            id="private"
            checked={(flags.private_mode as boolean) ?? false}
            onChange={(v) => setFlag('private_mode', v)}
            label={t('privateMode')}
          />
          <Toggle
            id="broadcast"
            checked={(flags.enable_udp_broadcast_relay as boolean) ?? false}
            onChange={(v) => setFlag('enable_udp_broadcast_relay', v)}
            label={t('udpBroadcastRelay')}
          />
        </div>
      </div>
    </section>
  );
}
