<script lang="ts" setup>
import { computed, ref, toValue, unref } from 'vue'
import { useFocusWithin } from '@vueuse/core';
import { FitxLabel, FitxErrorMessage } from '@/components';
import { getModifierClasses } from '@/utils/css-modifier';
import type { InputProps } from '@/components/fitx-input/types';

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  id: () => crypto.randomUUID(),
});

const slots = defineSlots<{
  'icon-start'?: () => any;
  'icon-end'?: () => any;
}>();

const modelValue = defineModel<string | number>({ default: '' });
const wrapper = ref();
const { focused } = useFocusWithin(wrapper);

const isDisabled = computed<boolean>(() => props.disabled || props.modifier === 'disabled');
const isFilled = computed(() => `${modelValue.value}`.length > 0);
const isActive = computed(() => toValue(focused));
const hasIconStart = computed(() => !!slots['icon-start']);
const hasIconEnd = computed(() => !!slots['icon-end']);

const componentClasses = computed(() => [
  'input',
  ...getModifierClasses('input', toValue(isFilled) ? 'is-filled' : []),
  ...getModifierClasses('input', toValue(isActive) ? 'is-active' : []),
  ...getModifierClasses('input', toValue(isDisabled) ? 'disabled' : []),
  ...getModifierClasses('input', toValue(hasIconStart) ? 'has-icon-start' : []),
  ...getModifierClasses('input', toValue(hasIconEnd) ? 'has-icon-end' : []),
  ...getModifierClasses('input', props.errorMessage ? 'has-error' : []),
  ...getModifierClasses('input', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('input', toValue(modelValue) ? 'is-filled' : []),
]);
</script>

<template>
  <div
    ref="wrapper"
    :data-theme="props.theme"
    :class="componentClasses">
    <div class="input__ui">
      <fitx-label
        class="input__label"
        text="props.label"
        :for="props.id" />
      <input
        class="input__input"
        placeholder=""
        :readonly="isDisabled || !!$attrs.readonly"
        :disabled="props.disabled"
        :id="props.id"
        :type="type"
        v-model="modelValue"
      />
      <span class="input__icon input__icon--start">
        <slot name="icon-start"></slot>
      </span>
      <span class="input__icon input__icon--end">
        <slot name="icon-end"></slot>
      </span>
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

  /* States / Modifiers */
  --_input-color-border-default: var(--input-color-border-light, var(--brand-color-gray-stone));
  --_input-color-input-default: var(--input-color-input-light, var(--brand-color-anthracite-0));
  --_input-color-label-default: var(--input-color-label-light, var(--brand-color-gray-carbon));
  --_input-color-surface-default: var(--input-color-surface-light, transparent);

  --_input-color-border-disabled: var(--_input-color-border-disabled-light, var(--brand-color-gray-stone));
  --_input-color-label-disabled: var(--_input-color-label-disabled-light, var(--brand-color-gray-cement));
  --_input-color-input-disabled: var(--_input-color-input-disabled-light, var(--brand-color-gray-cement));
  --_input-color-surface-disabled: var(--_input-color-surface-disabled-light, var(--brand-color-gray-chalk));

  --_input-color-border-error: var(--input-color-border-error-light, var(--functional-color-error-0));
  --_input-color-label-error: var(--input-color-label-error-light, var(--functional-color-error-0));
  --_input-color-surface-error: var(--input-color-surface-error-light, var(--functional-color-error-1-light));

  --_input-color-border-hover: var(--input-color-border-hover-light, var(--brand-color-gray-graphite));
  --_input-color-border-focus: var(--input-color-border-focus-light, var(--brand-color-anthracite-0));

  --_input-color-border: var(--_input-color-border-default);
  --_input-color-input: var(--_input-color-input-default);
  --_input-color-label: var(--_input-color-label-default);
  --_input-color-surface: var(--_input-color-surface-default);

  --_input-font-size-input: var(--input-font-size-input, 1.125rem);
  --_input-font-size-label: var(--_input-font-size-input);
  --_input-transition-duration: var(--input-transition-duration, 200ms);

  --_input-icon-size: var(--input-icon-size, 24px);
  --_input-label-size: 100%; // overlapping 2 rows

  display: inline-grid;
  gap: 4px;

  &:is([data-theme='dark']) {
    /* States / Modifiers */
    --_input-color-border-disabled: var(--_input-color-border-disabled-dark, var(--brand-color-gray-graphite));
    --_input-color-label-disabled: var(--_input-color-label-disabled-dark, var(--brand-color-gray-graphite));
    // --_input-color-input-disabled: var(--_input-color-input-disabled-dark, var(--brand-color-gray-cement));
    --_input-color-surface-disabled: var(--_input-color-surface-disabled-dark, var(--brand-color-anthracite-3));

    --_input-color-border-error: var(--input-color-border-error-dark, var(--functional-color-error-0));
    --_input-color-label-error: var(--input-color-label-error-dark, var(--functional-color-error-0));
    --_input-color-surface-error: var(--input-color-surface-error-dark, var(--functional-color-error-1-dark));

    --_input-color-border-hover: var(--input-color-border-hover-dark, var(--brand-color-gray-stone));
    --_input-color-border-focus: var(--input-color-border-focus-dark, var(--brand-color-gray-stone));

    --_input-color-border-default: var(--input-color-border-dark, var(--brand-color-gray-stone));
    --_input-color-input-default: var(--input-color-input-dark, var(--brand-color-white-0));
    --_input-color-label-default: var(--input-color-label-dark, var(--brand-color-gray-graphite));
  }

  &:hover,
  &--fake-hover {
    --_input-color-border: var(--_input-color-border-hover);
  }

  &:focus,
  &--fake-focus {
    --_input-color-border: var(--_input-color-border-focus);
  }

  &--is-active,
  &--is-filled {
    &:not(#{$self}--disabled) {
      --_input-label-size: 1rem;
      --_input-font-size-label: 0.875rem;
    }
  }

  &--disabled {
    --_input-color-border: var(--_input-color-border-disabled);
    --_input-color-label: var(--_input-color-label-disabled);
    --_input-color-input: var(--_input-color-input-disabled);
    --_input-color-surface: var(--_input-color-surface-disabled);
  }

  &--has-error {
    --_input-color-border: var(--_input-color-border-error);
    --_input-color-label: var(--_input-color-label-error);
    --_input-color-surface: var(--_input-color-surface-error);
  }

  &--has-icon-start {
    --_input-icon-size-start: var(--_input-icon-size);
  }
  &--has-icon-end {
    --_input-icon-size-end: var(--_input-icon-size);
  }

  &__ui {
    display: grid;
    // grid-template-rows: var(--_input-label-size) calc(100% - var(--_input-label-size));
    // grid-template-columns: minmax(0, var(--_input-icon-size)) 100% minmax(0, var(--_input-icon-size));
    grid:
      'icon-start label icon-end' var(--_input-label-size)
      'icon-start input icon-end' calc(100% - var(--_input-label-size)) /
    minmax(0, var(--_input-icon-size-start, 0)) 1fr minmax(0, var(--_input-icon-size-end, 0));
    block-size: var(--_input-block-size);
    padding-block: var(--_input-spacing-block);
    padding-inline: var(--_input-spacing-inline);
    transition: grid-template-rows var(--_input-transition-duration) ease;
    align-content: center;
    overflow: hidden;
    border: 1px solid var(--_input-color-border);
    border-radius: var(--_input-radius);
    font-weight: 400;
    column-gap: 0.625rem;
    background: var(--_input-color-surface);
  }

  &__icon {
    align-self: center;
    aspect-ratio: 1;
    overflow: hidden;
    display: inline-grid;
    place-items: center;

    /* &:empty {
      display: none;
    } */

    &--start {
      grid-area: icon-start;
    }
    &--end {
      grid-area: icon-end;
    }
  }


  &__label {
    grid-area: label;
    font-size: var(--_input-font-size-label);
    color: var(--_input-color-label);
    z-index: 2;
    height: 100%;
    display: grid;
    align-items: center;
    transition: font-size var(--_input-transition-duration) ease;

    /**
    Overwrite label grid column to get rid of gap (1/2)
    reset if icons shown
     */
    grid-column: icon-start / icon-end;

    #{$self}--has-icon-start & {
      grid-column-start: label;
    }

    #{$self}--has-icon-end & {
      grid-column-end: label;
    }
  }

  &__input {
    grid-area: input;
    font: inherit;
    font-size: var(--_input-font-size-input);
    color: var(--_input-color-input);
    background: none;
    padding: 0;
    border: unset;
    outline: 0;

    /**
    Overwrite label grid column to get rid of gap (2/2)
    reset if icons shown
     */
    grid-column: icon-start / icon-end;

    #{$self}--has-icon-start & {
      grid-column-start: input;
    }

    #{$self}--has-icon-end & {
      grid-column-end: input;
    }
  }
}
</style>
