<script lang="ts" setup>
import { GymxLabel } from '@fitx/gymx-ui';
import type { FitxLabelProps } from './types';

const props = defineProps<FitxLabelProps>();
</script>
<template>
  <gymx-label
    class="label"
    v-bind="props">
    <slot name="default">
      {{ props.text }}
    </slot>
  </gymx-label>
</template>
<style lang="scss" scoped>
.label {
  --label-color: var(--fitx-label-color);
  --label-color-hover: var(--label-color);

  :is(&--disabled, [disabled]) {
    --label-color: var(--fitx-label-color-disabled);
  }
  &--error {
    --label-color: var(--fitx-label-color-error);
  }

  // --fitx-label-color-activated just in input context
}
</style>
