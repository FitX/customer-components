import type { Theme } from '@/types';
export type FitxInputProps = {
  theme?: Theme;
  label: string;
  id?: string;
  type?: HTMLInputElement['type'];
  disabled?: boolean;
  errorMessage?: string;
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus'; // Dev Mode only @TODO remove from export on build
};
