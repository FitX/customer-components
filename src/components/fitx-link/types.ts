import type { GymxLinkSlots, GymxLinkProps } from '@fitx/gymx-ui';

export const linkStates = ['primary', 'secondary'] as const;
export type LinkState = (typeof linkStates)[number];
export interface FitxLinkProps extends GymxLinkProps {
  modifier?: LinkState,
}

export type FitxLinkSlots = GymxLinkSlots;
