import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';
import { Select } from '../common/Select';

export function SectionAdvanced() {
  const { t } = useTranslation();
  const { config, updateFlags } = useConfig();
  const flags = config.flags ?? {};

  const setFlag = (key: string, value: string | number | boolean) => {
    updateFlags({ [key]: value });
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
            id="quic"
            checked={(flags.enable_quic_proxy as boolean) ?? false}
            onChange={(v) => setFlag('enable_quic_proxy', v)}
            label={t('quicProxy')}
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
