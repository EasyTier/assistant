import { createContext } from 'react';
import type { EasyTierConfig } from '../types/config';

export interface ConfigContextType {
  config: EasyTierConfig;
  updateConfig: (partial: Partial<EasyTierConfig>) => void;
  updateFlags: (flags: Record<string, string | number | boolean | bigint>) => void;
  setConfig: (config: EasyTierConfig) => void;
  resetConfig: () => void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);
