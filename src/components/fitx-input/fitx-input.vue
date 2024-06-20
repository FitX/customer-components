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

  --_input-font-size-label: var(--_input-font-size-input);

  &__ui {
    position: relative;
    display: grid;
    grid: 'input' 1fr / 1fr;
    height: var(--_input-inline-size);
    padding-block: var(--_input-spacing-block);
    padding-inline: var(--_input-spacing-inline);
    border: 1px solid var(--_input-color-border);
    border-radius: var(--_input-radius);
  }


  &__label {
    position: absolute;
    font-size: var(--_input-font-size-label);
    transition: font-size 300ms ease;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    overflow: hidden;
    // inset: 0;
    // height: 100%;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    padding-block: var(--_input-spacing-block);
    padding-inline: var(--_input-spacing-inline);

    #{$self}:has(#{$self}__input:focus, #{$self}__input:not(:placeholder-shown)) {
      transform: scale(.85) translateY(-.5rem) translateX(.5rem);
    }
  }

  &__input {
    font-size: var(--_input-font-size-input);
    background: none;
  }

  &:hover {
    // --_input-font-size-label: calc(var(--_input-font-size-input) * var(--_input-font-size-label-factor));
    // --_input-label-row: calc(var(--_input-inline-size) * 0.4);
  }
}
</style>
