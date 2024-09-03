
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
  --button-color: var(--fitx-button-color, var(--primary-brand-color-white));
  --button-color-background: var(--fitx-button-color-background, var(--primary-brand-color-orange));

  :is(&--disabled, [disabled]) {
  }
}
</style>
