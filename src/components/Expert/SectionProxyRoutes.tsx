import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { RepeatableField } from '../common/RepeatableField';

export function SectionProxyRoutes() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  return (
    <section id="proxy" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('proxyAndRoutes')}
      </h2>
      <div className="flex flex-col gap-4">
        <FormField label={t('proxyNetworks')} description={t('proxyNetworkDescExpert')}>
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

        <FormField label={t('manualRoutes')} description={t('routeDescExpert')}>
          <RepeatableField
            values={config.routes ?? []}
            onChange={(v) => updateConfig({ routes: v })}
            placeholder="10.0.0.0/8"
            addLabel={t('addRoute')}
          />
        </FormField>

        <FormField label={t('exitNodes')} description={t('exitNodeDescExpert')}>
          <RepeatableField
            values={config.exit_nodes ?? []}
            onChange={(v) => updateConfig({ exit_nodes: v })}
            placeholder="10.144.144.1"
            addLabel={t('addExitNode')}
          />
        </FormField>
      </div>
    </section>
  );
}
