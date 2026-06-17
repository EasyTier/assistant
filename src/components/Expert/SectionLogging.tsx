import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Select } from '../common/Select';
import { getDefaultLogDir } from '../../types/config';
import type { TargetOS } from '../../types/config';

const levelOptions = [
  { value: 'trace', label: 'Trace' },
  { value: 'debug', label: 'Debug' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
];

const osOptions: { value: TargetOS; label: string }[] = [
  { value: 'linux', label: 'Linux' },
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
];

export function SectionLogging() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const handleOSChange = (os: TargetOS) => {
    updateConfig({ target_os: os });
  };

  return (
    <section id="logging" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('logging')}
      </h2>
      <div className="mb-4">
        <div className="inline-flex rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
          {osOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleOSChange(opt.value)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                config.target_os === opt.value
                  ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('consoleLogLevel')} htmlFor="console-level">
          <Select
            id="console-level"
            value={config.console_logger?.level ?? 'warn'}
            options={levelOptions}
            onChange={(v) =>
              updateConfig({
                console_logger: { ...(config.console_logger ?? {}), level: v },
              })
            }
          />
        </FormField>

        <FormField label={t('fileLogLevel')} htmlFor="file-level">
          <Select
            id="file-level"
            value={config.file_logger?.level ?? 'info'}
            options={levelOptions}
            onChange={(v) =>
              updateConfig({
                file_logger: { ...(config.file_logger ?? {}), level: v },
              })
            }
          />
        </FormField>

        <FormField label={t('logDir')} htmlFor="file-dir">
          <input
            id="file-dir"
            type="text"
            value={config.file_logger?.dir ?? ''}
            onChange={(e) =>
              updateConfig({
                file_logger: { ...(config.file_logger ?? {}), dir: e.target.value },
              })
            }
            placeholder={getDefaultLogDir(config.target_os) ?? '/tmp/easytier'}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>

        <FormField label={t('logFileName')} htmlFor="file-name">
          <input
            id="file-name"
            type="text"
            value={config.file_logger?.file ?? ''}
            onChange={(e) =>
              updateConfig({
                file_logger: { ...(config.file_logger ?? {}), file: e.target.value },
              })
            }
            placeholder="easytier"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
          />
        </FormField>
      </div>
    </section>
  );
}
