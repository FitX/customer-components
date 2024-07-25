import type { Theme } from '@/types';

export const textButtonStates = ['primary', 'secondary', 'disabled'] as const;
export type TextButtonState = (typeof textButtonStates)[number];

export type FitxTextButtonProps = {
  theme?: Theme;
  tag?: 'button' | 'span' | 'a';
  modifier?: TextButtonState | TextButtonState[];
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus' | 'active'; // Dev Mode only @TODO remove from export on build
};
