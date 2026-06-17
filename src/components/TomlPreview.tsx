import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { useConfig } from '../context/useConfig';
import { generateToml, downloadToml } from '../utils/toml';

export function TomlPreview() {
  const { t } = useTranslation();
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toml = generateToml(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(toml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full sm:bottom-4 sm:right-4 sm:left-auto sm:w-[calc(100%-2rem)] sm:max-w-xl">
      <div className="rounded-2xl bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <span>{t('tomlPreview')}</span>
          {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {!collapsed && (
          <>
            <div className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <pre className="max-h-60 sm:max-h-80 overflow-auto p-4 text-xs font-mono text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-[var(--color-code-bg)] dark:bg-[var(--color-code-bg-dark)]">
                {toml || t('noConfig')}
              </pre>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)] transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t('copied') : t('copy')}
              </button>
              <button
                type="button"
                onClick={() => downloadToml(config)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white dark:text-black bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] hover:opacity-90 transition-opacity"
              >
                <FileDown size={14} />
                {t('download')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
