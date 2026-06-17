import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Select } from '../common/Select';
import { RepeatableField } from '../common/RepeatableField';
import { formatValidationError, validateUrl } from '../../utils/validation';

export function StepConnections() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const validateUrlField = (value: string) => formatValidationError(validateUrl(value), t);

  const methodOptions = [
    { value: 'manual', label: t('manualConfigPeers') },
    { value: 'standalone', label: t('standaloneMode') },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('connectionsDesc')}
      </p>
      <FormField label={t('networkingMethod')} htmlFor="wz-method">
        <Select
          id="wz-method"
          value={config.networking_method}
          options={methodOptions}
          onChange={(v) =>
            updateConfig({ networking_method: v as 'manual' | 'standalone' })
          }
        />
      </FormField>

      {config.networking_method === 'manual' && (
        <>
          {(config.peers?.length ?? 0) === 0 && (
            <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 whitespace-pre-line">
              {t('noPeersWarning')}
            </div>
          )}
          <FormField label={t('peers')} description={t('peerDesc')}>
            <RepeatableField
              values={config.peers?.map((p) => p.uri) ?? []}
              onChange={(uris) =>
                updateConfig({ peers: uris.map((uri) => ({ uri })) })
              }
              placeholder="tcp://host:11010"
              addLabel={t('addPeer')}
              validate={validateUrlField}
            />
          </FormField>
          <FormField label={t('listeners')} description={t('localListenAddr')}>
            <RepeatableField
              values={config.listeners ?? []}
              onChange={(v) => updateConfig({ listeners: v })}
              placeholder="tcp://0.0.0.0:11010"
              addLabel={t('addListener')}
              validate={validateUrlField}
            />
          </FormField>
        </>
      )}
    </div>
  );
}
