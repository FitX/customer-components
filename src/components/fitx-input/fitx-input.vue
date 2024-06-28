<script lang="ts" setup>
import { FitxLabel, FitxErrorMessage } from '@/components';
import type { InputProps } from '@/components/fitx-input/types';
import { useInput } from '@/composables/use-input';

const props = withDefaults(defineProps<InputProps>(), {
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

const { wrapperEl, isDisabled, componentClasses } = useInput<string | number>(props, modelValue);
</script>

<template>
  <div
    ref="wrapperEl"
    :data-theme="props.theme"
    :class="componentClasses">
    <div class="input__ui">
      <fitx-label
        class="input__label"
        :text="props.label"
        :for="props.id" />
      <input
        class="input__input"
        placeholder=""
        :readonly="isDisabled || !!$attrs.readonly"
        :disabled="props.disabled"
        :id="props.id"
        :type="type"
        v-model="modelValue" />
      <span class="input__icon input__icon--start">
        <slot name="icon-start"></slot>
      </span>
      <span class="input__icon input__icon--end">
        <slot name="icon-end"></slot>
      </span>
    </div>
    <fitx-error-message
      v-if="errorMessage"
      :text="props.errorMessage" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/shared-input.scss' as shared-input;
.input {
  @include shared-input.use-input();
}
</style>
