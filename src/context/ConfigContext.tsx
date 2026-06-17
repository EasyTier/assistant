import { useState, type ReactNode } from 'react';
import type { EasyTierConfig } from '../types/config';
import { defaultConfig } from '../types/config';
import { ConfigContext } from './configContext';

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<EasyTierConfig>(defaultConfig());

  const updateConfig = (partial: Partial<EasyTierConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  };

  const updateFlags = (flags: Record<string, string | number | boolean | bigint>) => {
    setConfigState((prev) => ({
      ...prev,
      flags: { ...prev.flags, ...flags },
    }));
  };

  const setConfig = (newConfig: EasyTierConfig) => {
    setConfigState(newConfig);
  };

  const resetConfig = () => {
    setConfigState((prev) => defaultConfig(prev.target_os));
  };

  return (
    <ConfigContext.Provider
      value={{ config, updateConfig, updateFlags, setConfig, resetConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
