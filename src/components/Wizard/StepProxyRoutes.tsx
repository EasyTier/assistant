import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { RepeatableField } from '../common/RepeatableField';

export function StepProxyRoutes() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('proxyRoutesDesc')}
      </p>
      <FormField label={t('proxyNetworks')} description={t('proxyNetworkDesc')}>
        <RepeatableField
          values={config.proxy_networks?.map((p) => p.cidr) ?? []}
          onChange={(cidrs) =>
            updateConfig({
              proxy_networks: cidrs.map((cidr) => ({ cidr })),
            })
          }
          placeholder="192.168.1.0/24"
          addLabel={t('addNetwork')}
        />
      </FormField>
      <FormField label={t('manualRoutes')} description={t('routeDesc')}>
        <RepeatableField
          values={config.routes ?? []}
          onChange={(v) => updateConfig({ routes: v })}
          placeholder="10.0.0.0/8"
          addLabel={t('addRoute')}
        />
      </FormField>
      <FormField label={t('exitNodes')} description={t('exitNodeDesc')}>
        <RepeatableField
          values={config.exit_nodes ?? []}
          onChange={(v) => updateConfig({ exit_nodes: v })}
          placeholder="10.144.144.1"
          addLabel={t('addExitNode')}
        />
      </FormField>
    </div>
  );
}
