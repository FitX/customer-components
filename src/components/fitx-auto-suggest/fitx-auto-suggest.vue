<script lang="ts" setup>
import { FitxInput } from '@/components';
import type { AutoSuggestProps } from '@/components/fitx-auto-suggest/types';

const props = withDefaults(defineProps<AutoSuggestProps>(), {
  type: 'text',
  id: () => crypto.randomUUID(),
});

defineSlots<{
  /**
   * prepend usage for icons
   */
  'icon-start'?: () => any;
  /**
   * append usage for icons
   */
  'icon-end'?: () => any;
}>();

const modelValue = defineModel<string | number>({ default: '' });
</script>

<template>
  <div
    ref="wrapperEl"
    :data-theme="props.theme"
    :class="null">
    <fitx-input :label="props.label" v-model="modelValue">
      <slot name="icon-start"></slot>
      <slot name="icon-end"></slot>
    </fitx-input>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/shared-input.scss' as shared-input;
.input {
  @include shared-input.use-input();
}
</style>
