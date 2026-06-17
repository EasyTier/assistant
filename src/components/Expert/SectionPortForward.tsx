import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { FormField } from '../common/FormField';
import { Plus, Trash2 } from 'lucide-react';
import type { PortForwardConfig } from '../../types/config';

export function SectionPortForward() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const forwards = config.port_forwards ?? [];

  const updateForward = (index: number, field: keyof PortForwardConfig, value: string) => {
    const next = [...forwards];
    next[index] = { ...next[index], [field]: value };
    updateConfig({ port_forwards: next });
  };

  const addForward = () => {
    updateConfig({
      port_forwards: [...forwards, { bind_addr: '0.0.0.0:11011', dst_addr: '192.168.1.1:80', proto: 'tcp' }],
    });
  };

  const removeForward = (index: number) => {
    updateConfig({ port_forwards: forwards.filter((_, i) => i !== index) });
  };

  return (
    <section id="forward" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('portForward')}
      </h2>
      <div className="flex flex-col gap-3">
        {forwards.map((fw, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-2 items-end p-4 rounded-xl bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
          >
            <FormField label={t('localBind')} htmlFor={`fw-bind-${i}`}>
              <input
                id={`fw-bind-${i}`}
                type="text"
                value={fw.bind_addr}
                onChange={(e) => updateForward(i, 'bind_addr', e.target.value)}
                placeholder="0.0.0.0:11011"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
              />
            </FormField>
            <FormField label={t('dstAddress')} htmlFor={`fw-dst-${i}`}>
              <input
                id={`fw-dst-${i}`}
                type="text"
                value={fw.dst_addr}
                onChange={(e) => updateForward(i, 'dst_addr', e.target.value)}
                placeholder="192.168.1.1:80"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
              />
            </FormField>
            <FormField label={t('protocol')} htmlFor={`fw-proto-${i}`}>
              <select
                id={`fw-proto-${i}`}
                value={fw.proto}
                onChange={(e) => updateForward(i, 'proto', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#27272a] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)]"
              >
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
              </select>
            </FormField>
            <button
              type="button"
              onClick={() => removeForward(i)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addForward}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-dashed border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:border-[var(--color-text-h)] dark:hover:border-[var(--color-text-h-dark)] hover:text-[var(--color-text-h)] dark:hover:text-[var(--color-text-h-dark)] transition-colors"
        >
          <Plus size={16} />
          {t('addPortForwardRule')}
        </button>
      </div>
    </section>
  );
}
