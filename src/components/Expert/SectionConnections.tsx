import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Select } from '../common/Select';
import { RepeatableField } from '../common/RepeatableField';
import { formatValidationError, validateUrl } from '../../utils/validation';

export function SectionConnections() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const validateUrlField = (value: string) => formatValidationError(validateUrl(value), t);

  const methodOptions = [
    { value: 'manual', label: t('manualConfig') },
    { value: 'standalone', label: t('standaloneMode') },
  ];

  return (
    <section id="connections" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('connections')}
      </h2>
      <div className="flex flex-col gap-4">
        <FormField label={t('networkingMethod')} htmlFor="net-method">
          <Select
            id="net-method"
            value={config.networking_method}
            options={methodOptions}
            onChange={(v) =>
              updateConfig({ networking_method: v as 'manual' | 'standalone' })
            }
          />
        </FormField>

        {config.networking_method === 'manual' && (
          <>
            <FormField label={t('peers')} description={t('peerDescExpert')}>
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

            <FormField label={t('mappedListeners')} description={t('mappedListenAddr')}>
              <RepeatableField
                values={config.mapped_listeners ?? []}
                onChange={(v) => updateConfig({ mapped_listeners: v })}
                placeholder="tcp://public-ip:11010"
                addLabel={t('addMappedListener')}
                validate={validateUrlField}
              />
            </FormField>
          </>
        )}
      </div>
    </section>
  );
}
