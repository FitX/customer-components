import type { GymxButtonProps, GymxButtonSlots } from '@fitx/gymx-ui';

export type ButtonSize = 'default' | 'small';
export const buttonStates = ['primary', 'secondary', 'tertiary'] as const;
export type ButtonState = (typeof buttonStates)[number];

export interface FitxButtonProps extends GymxButtonProps{
  size?: ButtonSize;
  modifier?: ButtonState;
  isIdle?: boolean;
}

export type FitxButtonSlots = GymxButtonSlots;


