<script lang="ts" setup>
import { computed, toValue } from 'vue';
import { FitxLabel, FitxErrorMessage } from '@/components';
import { getModifierClasses } from '@/utils/css-modifier';
import type { InputProps } from '@/components/fitx-input/types';
const props = withDefaults(defineProps<InputProps>(), {
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
        class="foo"
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
  --_input-spacing-inline: var(--input-spacing-inline, 1.125rem);
  --_input-spacing-block: var(--input-spacing-block, 0.625rem);
  --_input-radius: var(--input-radius, var(--radius-4));
  --_input-color-border: var(--input-color-border-light, var(--brand-color-gray-stone));
  --_input-color-input: var(--input-color-input-light, var(--brand-color-anthracite-0));
  --_input-color-label: var(--input-color-label-light, var(--brand-color-gray-carbon));
  --_input-font-size-input: var(--input-font-size-input, 1.125rem);
  // --_input-font-size-label: var(--input-font-size-label, 0.875rem); // 77.78%
  --_input-font-size-label-factor: var(--input-font-size-label-factor, 0.7778); // 77.78%

  --_input-label-row: var(--_input-inline-size);
  --_input-font-size-label: var(--_input-font-size-input);

  &__ui {
    display: grid;
    height: var(--_input-inline-size);
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-columns: 1fr;
    transition: grid-template-rows 200ms ease;
    align-items: center;
    padding-block: var(--_input-spacing-block);
    padding-inline: var(--_input-spacing-inline);
    border: 1px solid var(--_input-color-border);
    border-radius: var(--_input-radius);
  }


  &__label {
    //z-index: 1;
    grid-row: 1 / -1;
    grid-column: 1;
    // align-self: center;
    font-size: var(--_input-font-size-label);
    transition: all 300ms ease;
  }

  .foo {
    grid-row: 1 / -1;
    grid-column: 1;
    font-size: var(--_input-font-size-input);
    background: none;
  }

  &:hover {
    --_input-font-size-label: calc(var(--_input-font-size-input) * var(--_input-font-size-label-factor));
    --_input-label-row: calc(var(--_input-inline-size) * 0.4);

    .input__label {
      grid-row: 1 / 2;
    }
  }
}
</style>
