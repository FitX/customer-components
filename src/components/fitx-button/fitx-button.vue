
<script lang="ts" setup>
import { GymxButton } from '@fitx/gymx-ui';

import type { FitxButtonProps, FitxButtonSlots } from './types';
defineSlots<FitxButtonSlots>();

const props = defineProps<FitxButtonProps>();
</script>
<template>
  <gymx-button class="button">
    <template #icon-start>
      <slot name="icon-start"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #icon-end>
      <slot name="icon-end"></slot>
    </template>
  </gymx-button>
</template>
<style lang="scss" scoped>
.button {
  $self: &;

  --button-color: var(--fitx-button-color, var(--primary-brand-color-white));
  --button-color-background: var(--fitx-button-color-background, var(--primary-brand-color-orange));

  --button-padding-inline: var(--fitx-size-large);
  --button-padding-block: var(--fitx-size-small);
  --button-radius: var(--fitx-radius-10);
  --button-font-weight: 400;

  --_button-border-width: 2px;
  --_button-border-color: var(--button-color-background);

  --button-border: var(--_button-border-width) solid var(--_button-border-color);
  --button-font-size: inherit;
  --button-font-family: inherit;

  &:is(:hover, &--hover, :active, &--active) {
    --button-color-background: var(--brand-color-orange-1);
  }

  // --button-color-background-hover: var(--brand-color-orange-1);

  :is(&--disabled, [disabled]) {
  }
}
</style>
