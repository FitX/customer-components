<script lang="ts" setup>
import { computed, toValue } from 'vue';
import { FitxLabel, FitxErrorMessage } from '@/components';
import { getModifierClasses } from '@/utils/css-modifier';
import type { FitxInputProps } from '@/components/fitx-input/types';
const props = withDefaults(defineProps<FitxInputProps>(), {
  type: 'text',
  id: () => crypto.randomUUID(),
});
const modelValue = defineModel<string | number>({ default: '' });
const componentClasses = computed(() => [
  'input',
  ...getModifierClasses('input', props.disabled ? 'disabled' : []),
  ...getModifierClasses('input', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('input', toValue(modelValue) ? 'is-filled' : []),
]);
</script>

<template>
  <div :class="componentClasses">
    <div class="input__ui">
      <fitx-label
        class="input__label"
        text="props.label"
        :for="props.id" />
      <input
        :type="type"
        v-model="modelValue"
      />
    </div>
    <fitx-error-message
      v-if="errorMessage"
      :text="props.errorMessage || ''" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  --_input-inline-size: var(--input-inline-size, 3.75rem);
  --_input-spacing-inline: var(--input-spacing-inline, 0.625rem);
  --_input-spacing-block: var(--input-spacing-block, 1.125rem);
  --_input-radius: var(--input-radius, var(--radius-4));
  --_input-color-border: var(--input-color-border-light, var(--brand-color-gray-stone));
  --_input-color-input: var(--input-color-input-light, var(--brand-color-anthracite-0));
  --_input-color-label: var(--input-color-label-light, var(--brand-color-gray-carbon));
  --_input-font-size-input: var(--input-font-size-input, 1.125rem);
  // --_input-font-size-label: var(--input-font-size-label, 0.875rem); // 77.78%
  --_input-font-size-label-factor: var(--input-font-size-label-factor, 0.7778); // 77.78%

  --_input-label-inline-size: var(--_input-inline-size);
  --_input-font-size-label: var(--_input-font-size-input);

  &__ui {
    border: 1px solid red;
    display: grid;
    height: var(--_input-inline-size);
    grid-template-rows: var(--_input-inline-size) var(--_input-label-inline-size);
    grid-template-columns: 1fr;
    transition: grid-template-rows 200ms ease;
    align-items: center;
  }


  &__label {
    z-index: 1;
    grid-row: 1 / 2;
    grid-column: 1;
    border: 1px solid blue;
    // align-self: center;
    font-size: var(--_input-font-size-label);
  }

  input {
    grid-row: 1 / 2;
    grid-column: 1;
    font-size: var(--_input-font-size-input);
  }

  &:hover {
    --_input-font-size-label: calc(var(--_input-font-size-input) * var(--_input-font-size-label-factor));
    --_input-label-inline-size: 10px;
  }
}
</style>
