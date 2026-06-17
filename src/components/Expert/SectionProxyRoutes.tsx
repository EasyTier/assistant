import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { RepeatableField } from '../common/RepeatableField';
import { formatValidationError, validateIpAddr, validateIpv4CidrStrict } from '../../utils/validation';

export function SectionProxyRoutes() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const error = (validator: (value: string) => ReturnType<typeof validateIpv4CidrStrict>) =>
    (value: string) => formatValidationError(validator(value), t);

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
            validate={error(validateIpv4CidrStrict)}
          />
        </FormField>

        <FormField label={t('manualRoutes')} description={t('routeDescExpert')}>
          <RepeatableField
            values={config.routes ?? []}
            onChange={(v) => updateConfig({ routes: v })}
            placeholder="10.0.0.0/8"
            addLabel={t('addRoute')}
            validate={error(validateIpv4CidrStrict)}
          />
        </FormField>

        <FormField label={t('exitNodes')} description={t('exitNodeDescExpert')}>
          <RepeatableField
            values={config.exit_nodes ?? []}
            onChange={(v) => updateConfig({ exit_nodes: v })}
            placeholder="10.144.144.1"
            addLabel={t('addExitNode')}
            validate={error(validateIpAddr)}
          />
        </FormField>
      </div>
    </section>
  );
}
