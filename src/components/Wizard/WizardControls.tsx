import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';

interface WizardControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onDownload: () => void;
  disableDownload?: boolean;
}

export function WizardControls({ currentStep, totalSteps, onPrev, onNext, onDownload, disableDownload }: WizardControlsProps) {
  const { t } = useTranslation();
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] bg-white dark:bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">{t('prevStep')}</span>
      </button>

      <span className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('stepCounter', { current: currentStep + 1, total: totalSteps })}
      </span>

      {isLast ? (
        <button
          type="button"
          onClick={onDownload}
          disabled={disableDownload}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white dark:text-black bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <FileDown size={16} />
          <span className="hidden sm:inline">{t('download')}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white dark:text-black bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] hover:opacity-90 transition-opacity"
        >
          <span className="hidden sm:inline">{t('nextStep')}</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
