import { Wand2, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useConfig } from '../context/useConfig';
import { getTheme, setTheme, type ThemeMode } from '../utils/theme';
import { LanguageSwitcher } from './LanguageSwitcher';


interface HeaderProps {
  mode: 'wizard' | 'expert';
  onModeChange: (mode: 'wizard' | 'expert') => void;
}


export function Header({ mode, onModeChange }: HeaderProps) {
  const { t } = useTranslation();
  useConfig();
  const [theme, setThemeState] = useState<ThemeMode>(getTheme);

  useEffect(() => {
    const handler = () => setThemeState(getTheme());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 dark:bg-[var(--color-bg-dark)]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <img src="/easytier.png" alt="EasyTier" className="w-8 h-8 rounded-xl shrink-0" />
          <h1 className="text-lg font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] truncate">
            {t('appTitle')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
            <button
              type="button"
              onClick={() => onModeChange('wizard')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                mode === 'wizard'
                  ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
              }`}
            >
              <Wand2 size={14} />
              {t('wizardMode')}
            </button>
            <button
              type="button"
              onClick={() => onModeChange('expert')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                mode === 'expert'
                  ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
              }`}
            >
              <SlidersHorizontal size={14} />
              {t('expertMode')}
            </button>
          </div>

          <LanguageSwitcher />

          <div className="inline-flex rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`inline-flex items-center justify-center w-9 h-9 transition-colors ${
                theme === 'light'
                  ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
              }`}
            >
              <Sun size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`inline-flex items-center justify-center w-9 h-9 transition-colors ${
                theme === 'dark'
                  ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
              }`}
            >
              <Moon size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
