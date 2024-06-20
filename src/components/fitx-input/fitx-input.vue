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
        class="input__input"
        placeholder=""
        :id="props.id"
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
  $self: &;
  --_input-block-size: var(--input-block-size, 3.75rem); // 60px
  --_input-spacing-inline: var(--input-spacing-inline, 1.125rem);
  --_input-spacing-block: var(--input-spacing-block, 0.625rem);
  --_input-radius: var(--input-radius, var(--radius-4));

  --_input-color-border: var(--input-color-border-light, var(--brand-color-gray-stone));
  --_input-color-input: var(--input-color-input-light, var(--brand-color-anthracite-0));
  --_input-color-label: var(--input-color-label-light, var(--brand-color-gray-carbon));

  --_input-font-size-input: var(--input-font-size-input, 1.125rem);
  --_input-font-size-label: var(--_input-font-size-input);
  --_input-transition-duration: var(--input-transition-duration, 200ms);

  --_input-label-size: 100%; // overlapping 2 rows

  &__ui {
    display: grid;
    grid-template-rows: var(--_input-label-size) calc(100% - var(--_input-label-size));
    grid-template-columns: 100%;
    block-size: var(--_input-block-size);
    padding-block: var(--_input-spacing-block);
    padding-inline: var(--_input-spacing-inline);
    transition: grid-template-rows var(--_input-transition-duration) ease;
    align-content: center;
    overflow: hidden;
    border: 1px solid var(--_input-color-border);
    border-radius: var(--_input-radius);
    font-weight: 400;

    /**
    @TODO replace because browser support has
     */
    &:has(input:focus),
    &:has(input:not(:placeholder-shown)){
      --_input-label-size: 1rem;
      --_input-font-size-label: 0.875rem;
    }
  }


  &__label {
    font-size: var(--_input-font-size-label);
    z-index: 2;
    grid-row: 1 / 2;
    grid-column: 1;
    height: 100%;
    display: grid;
    align-items: center;
    transition: font-size var(--_input-transition-duration) ease;
  }

  &__input {
    font: inherit;
    font-size: var(--_input-font-size-input);
    grid-column: 1;
    padding: 0;
    border: unset;
    outline: 0;
  }

  &:hover {
    // --_input-font-size-label: calc(var(--_input-font-size-input) * var(--_input-font-size-label-factor));
    // --_input-label-row: calc(var(--_input-inline-size) * 0.4);
  }
}
</style>
