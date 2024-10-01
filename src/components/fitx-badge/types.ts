import type { GymxBadgeProps } from '@fitx/gymx-ui';
import type { Component } from 'vue';

export interface FitxBadgeProps extends GymxBadgeProps {
// @TODO Define your props here
  icon?: Component | string,
  isRound?: boolean,
}
