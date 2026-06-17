import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';
import { formatValidationError, validateIpv4Inet, validateRequired } from '../../utils/validation';

export function SectionIP() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const ipv4 = config.ipv4 ?? '';
  const ipv4Error = formatValidationError(
    config.dhcp === false ? validateRequired(ipv4) ?? validateIpv4Inet(ipv4) : validateIpv4Inet(ipv4),
    t,
  );

  return (
    <section id="ip" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('ipSettings')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Toggle
            id="dhcp"
            checked={config.dhcp ?? false}
            onChange={(v) => updateConfig({ dhcp: v })}
            label={t('enableDhcp')}
          />
        </div>

        <FormField label={t('ipv4Address')} htmlFor="ipv4" description={t('requiredWhenDhcpOff')} error={ipv4Error}>
          <input
            id="ipv4"
            type="text"
            value={config.ipv4 ?? ''}
            onChange={(e) => updateConfig({ ipv4: e.target.value })}
            placeholder="10.144.144.10"
            disabled={config.dhcp}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)] disabled:opacity-50"
          />
        </FormField>

        <FormField label={t('ipv6Address')} htmlFor="ipv6">
          <input
            id="ipv6"
            type="text"
            value={config.ipv6 ?? ''}
            onChange={(e) => updateConfig({ ipv6: e.target.value })}
            placeholder="fd00::1"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <div className="md:col-span-2">
          <Toggle
            id="ipv6-provider"
            checked={config.ipv6_public_addr_provider ?? false}
            onChange={(v) => updateConfig({ ipv6_public_addr_provider: v })}
            label={t('ipv6Provider')}
          />
        </div>
      </div>
    </section>
  );
}
