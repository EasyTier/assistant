import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
}

export function FormField({ label, htmlFor, children, description, error, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-xs text-[var(--color-text)] dark:text-[var(--color-text-dark)] opacity-70">
          {description}
        </p>
      )}
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
