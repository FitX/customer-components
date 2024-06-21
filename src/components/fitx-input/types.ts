import type { Theme } from '@/types';

export type InputModifier = 'disabled';
export type InputProps = {
  theme?: Theme;
  label: string;
  id?: string;
  type?: HTMLInputElement['type'];
  /**
   * Native disabled Attribute
   */
  disabled?: boolean;
  errorMessage?: string;
  modifier?: InputModifier,
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus'; // Dev Mode only @TODO remove from export on build
};
