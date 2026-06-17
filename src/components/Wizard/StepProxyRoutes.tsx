import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { RepeatableField } from '../common/RepeatableField';
import { formatValidationError, validateIpAddr, validateIpv4CidrStrict } from '../../utils/validation';

export function StepProxyRoutes() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const error = (validator: (value: string) => ReturnType<typeof validateIpv4CidrStrict>) =>
    (value: string) => formatValidationError(validator(value), t);

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
          validate={error(validateIpv4CidrStrict)}
        />
      </FormField>
      <FormField label={t('manualRoutes')} description={t('routeDesc')}>
        <RepeatableField
          values={config.routes ?? []}
          onChange={(v) => updateConfig({ routes: v })}
          placeholder="10.0.0.0/8"
          addLabel={t('addRoute')}
          validate={error(validateIpv4CidrStrict)}
        />
      </FormField>
      <FormField label={t('exitNodes')} description={t('exitNodeDesc')}>
        <RepeatableField
          values={config.exit_nodes ?? []}
          onChange={(v) => updateConfig({ exit_nodes: v })}
          placeholder="10.144.144.1"
          addLabel={t('addExitNode')}
          validate={error(validateIpAddr)}
        />
      </FormField>
    </div>
  );
}
