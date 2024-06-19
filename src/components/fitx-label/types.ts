import type { Theme } from '@/types';

export type LabelModifier = 'disabled';
export type FitxLabelProps = {
  text: string;
  for?: string;
  modifier?: LabelModifier,
  theme?: Theme;
  error?: boolean;
};
