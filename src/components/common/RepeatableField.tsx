import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface RepeatableFieldProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  validate?: (value: string) => string | undefined;
}

export function RepeatableField({ values, onChange, placeholder, addLabel, validate }: RepeatableFieldProps) {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState<string>();

  const addValue = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const error = validate?.(trimmed);
    if (error) {
      setInputError(error);
      return;
    }

    if (!values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInputValue('');
    setInputError(undefined);
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setInputError(undefined);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addValue();
            }
          }}
          placeholder={placeholder}
          className={`flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border focus:outline-none focus:ring-1 ${
            inputError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--color-border)] dark:border-[#3f3f46] focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]'
          }`}
        />
        <button
          type="button"
          onClick={addValue}
          className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white dark:text-black bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">{addLabel}</span>
        </button>
      </div>
      {inputError && <p className="text-xs text-red-600 dark:text-red-400">{inputError}</p>}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((v, i) => {
            const valueError = validate?.(v);
            return (
              <span
                key={i}
                title={valueError}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${
                  valueError
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                    : 'bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)] text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]'
                }`}
              >
                {v}
                <button
                  type="button"
                  onClick={() => removeValue(i)}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-[var(--color-text-h)] hover:text-white dark:hover:bg-[var(--color-text-h-dark)] dark:hover:text-black transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
