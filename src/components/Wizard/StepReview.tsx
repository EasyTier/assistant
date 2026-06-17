import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import { useConfig } from '../../context/useConfig';
import { generateToml } from '../../utils/toml';

export function StepReview() {
  const { t } = useTranslation();
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);

  const toml = generateToml(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(toml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('reviewDesc')}
      </p>
      <div className="rounded-2xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]">
          <span className="text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]">
            easytier-config.toml
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)] transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="max-h-96 overflow-auto p-4 text-xs font-mono text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-[var(--color-code-bg)] dark:bg-[var(--color-code-bg-dark)]">
          {toml || t('noConfig')}
        </pre>
      </div>
    </div>
  );
}
