
<script lang="ts" setup>
import { GymxButton } from '@fitx/gymx-ui';

import type { FitxButtonProps } from './types';
const slots = defineSlots<{
  'icon-start'(): any,
  default(): any,
  'icon-end'(): any,
}>();

const props = defineProps<FitxButtonProps>();
</script>
<template>
  <gymx-button>
   <template
      v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </gymx-button>
  <!--<gymx-button>
    <template #icon-start>
      <slot name="icon-start"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #icon-end>
      <slot name="icon-end"></slot>
    </template>
  </gymx-button>-->
</template>
<style lang="scss" scoped></style>
