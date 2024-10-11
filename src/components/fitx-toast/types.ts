import type { GymxToastProps } from '@fitx/gymx-ui';

export interface FitxToastProps extends Omit<GymxToastProps, 'icon'> {
  type: 'success' | 'error'
}
