import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shuffle, Eye, EyeOff } from 'lucide-react';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { randomNetworkName, randomSecret } from '../../utils/random';
import { formatValidationError, validateRequired } from '../../utils/validation';

export function StepNetwork() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const ni = config.network_identity ?? { network_name: '' };
  const [showSecret, setShowSecret] = useState(false);
  const networkNameError = formatValidationError(validateRequired(ni.network_name), t);

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('networkIdentityDesc')}
      </p>
      <FormField label={t('networkName')} htmlFor="wz-net-name" error={networkNameError} required>
        <div className="flex gap-2">
          <input
            id="wz-net-name"
            type="text"
            value={ni.network_name}
            onChange={(e) =>
              updateConfig({
                network_identity: { ...ni, network_name: e.target.value },
              })
            }
            placeholder="default"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
          <button
            type="button"
            onClick={() =>
              updateConfig({
                network_identity: { ...ni, network_name: randomNetworkName() },
              })
            }
            title={t('randomGenerate')}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-[var(--color-surface-dark)] shrink-0"
          >
            <Shuffle size={14} />
          </button>
        </div>
      </FormField>
      <FormField label={t('networkSecret')} htmlFor="wz-net-secret">
        <div className="flex gap-2">
          <input
            id="wz-net-secret"
            type={showSecret ? 'text' : 'password'}
            value={ni.network_secret ?? ''}
            onChange={(e) =>
              updateConfig({
                network_identity: { ...ni, network_secret: e.target.value },
              })
            }
            placeholder={t('emptyMeansNoPassword')}
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
          <button
            type="button"
            onClick={() => setShowSecret((v) => !v)}
            title={showSecret ? t('hide') : t('show')}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-[var(--color-surface-dark)] shrink-0"
          >
            {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button
            type="button"
            onClick={() =>
              updateConfig({
                network_identity: { ...ni, network_secret: randomSecret() },
              })
            }
            title={t('randomGenerate')}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-[var(--color-surface-dark)] shrink-0"
          >
            <Shuffle size={14} />
          </button>
        </div>
      </FormField>
      <FormField label={t('instanceName')} htmlFor="wz-inst-name">
        <input
          id="wz-inst-name"
          type="text"
          value={config.instance_name ?? ''}
          onChange={(e) => updateConfig({ instance_name: e.target.value })}
          placeholder="default"
          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
        />
      </FormField>
    </div>
  );
}
