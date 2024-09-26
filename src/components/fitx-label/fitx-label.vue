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
@use "@/assets/styles/shared/label" as sharedLabel;

.label {
  @include sharedLabel.label-styles();
}
</style>
