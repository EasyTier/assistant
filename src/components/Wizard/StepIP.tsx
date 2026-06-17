import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';

export function StepIP() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('ipSettingsDesc')}
      </p>
      <Toggle
        id="wz-dhcp"
        checked={config.dhcp ?? false}
        onChange={(v) => updateConfig({ dhcp: v })}
        label={t('enableDhcp')}
      />
      {!config.dhcp && (
        <FormField label={t('staticIpv4')} htmlFor="wz-ipv4" required>
          <input
            id="wz-ipv4"
            type="text"
            value={config.ipv4 ?? ''}
            onChange={(e) => updateConfig({ ipv4: e.target.value })}
            placeholder="10.144.144.10"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>
      )}
      <FormField label={t('hostname')} htmlFor="wz-hostname">
        <input
          id="wz-hostname"
          type="text"
          value={config.hostname ?? ''}
          onChange={(e) => updateConfig({ hostname: e.target.value })}
          placeholder="my-node"
          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
        />
      </FormField>
    </div>
  );
}
