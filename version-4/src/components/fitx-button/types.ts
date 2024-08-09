import type { Theme } from '@/types';

export type ButtonSize = 'default' | 'small';
export const buttonStates = ['primary', 'secondary', 'tertiary', 'quaternary', 'disabled'] as const;
export type ButtonState = (typeof buttonStates)[number];

export type FitxButtonProps = {
  theme?: Theme;
  tag?: 'button' | 'span' | 'a';
  size?: ButtonSize;
  /**
   * Active State
   */
  isActive?: boolean;
  modifier?: ButtonState | ButtonState[];
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus' | 'active'; // Dev Mode only @TODO remove from export on build
};
