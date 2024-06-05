<script lang="ts">
import type { Theme } from '@/types';

export type SwitchModifier = 'disabled';

export type FitxSwitchProps = {
  theme?: Theme;
  id?: string,
  label: string,
  textOn?: string;
  textOff?: string;
  modifier?: SwitchModifier,
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus'; // Dev Mode only @TODO remove from export on build
};
</script>
<script lang="ts" setup>
import { computed, toValue } from 'vue';
import { IconCheckmark } from '@/components/icons';
import { getModifierClasses } from '@/utils/css-modifier'
const props = withDefaults(defineProps<FitxSwitchProps>(), {
  id: crypto.randomUUID(),
  textOn: 'An',
  textOff: 'Aus',
});
const modelValue = defineModel<boolean>({ required: true });

const componentClasses = computed(() => [
  ...getModifierClasses('switch', props.modifier ?? []),
  ...getModifierClasses('switch', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('switch', toValue(modelValue) ? 'is-active' : []),
]);
</script>

<template>
  <label
    class="switch"
    :for="props.id"
    :class="componentClasses">
    <input
      role="switch"
      :id="props.id"
      v-model="modelValue"
      class="switch__input"
      type="checkbox">
    <span class="switch__presentation">
      <span class="switch__track">
        <icon-checkmark class="switch__icon" />
      </span>
    </span>
    <span class="switch__label">
      {{ props.label }}
      <span class="switch__text-on visually-hidden">{{ props.textOn }}</span>
      <span class="switch__text-off visually-hidden">{{ props.textOff }}</span>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utilities' as utilities;

.switch {
  $self: &;

  --_switch-block-size: var(--switch-block-size, var(--size-7));
  --_switch-inline-size: var(--switch-inline-size, var(--size-8));
  --_switch-radius: var(--switch-radius, var(--radius-7));
  --_switch-track-spacing: var(--switch-track-spacing, 2px);
  --_switch-track-size: var(--switch-track-size, calc(100% - (2 * var(--_switch-track-spacing))));
  --_switch-font-size: var(--switch-font-size, 1.25rem);

  /**
  Light Mode Tokens
   */
  --_switch-color-surface-selected: var(--switch-color-surface-selected-light, var(--functional-color-success-0));
  --_switch-color-surface-unselected: var(--switch-color-surface-unselected-light, var(--brand-color-gray-stone));
  --_switch-color-surface-unselected-hover: var(--switch-color-surface-unselected-hover-light, var(--brand-color-gray-graphite));
  --_switch-color-surface-unselected-disabled: var(--switch-color-surface-unselected-disabled-light, var(--brand-color-gray-chalk));
  --_switch-color-surface-unselected-focused: var(--switch-color-surface-unselected-focused-light, var(--brand-color-gray-graphite));
  --_switch-color-surface-selected-focused: var(--switch-color-surface-selected-focused-light, var(--_switch-color-surface-selected));
  --_switch-color-surface-selected-disabled: var(--switch-color-surface-selected-disabled-light, var(--brand-color-gray-plumb));

  --_switch-color-track-selected: var(--switch-color-track-selected-light, var(--brand-color-white-0));
  --_switch-color-track-unselected: var(--switch-color-track-unselected-light, var(--_switch-color-track-selected));
  --_switch-color-track-unselected-hover: var(--switch-color-track-unselected-hover-light, var(--_switch-color-track-selected));
  --_switch-color-track-unselected-disabled: var(--switch-color-track-unselected-disabled-light, var(--_switch-color-track-selected));
  --_switch-color-track-unselected-focused: var(--switch-color-track-unselected-focused-light, var(--_switch-color-track-selected));
  --_switch-color-track-selected-focused: var(--switch-color-track-selected-focused-light, var(--_switch-color-track-selected));
  --_switch-color-track-selected-disabled: var(--switch-color-track-selected-disabled-light, var(--_switch-color-track-selected));

  --_switch-color-icon-selected: var(--switch-color-icon-selected-light, var(--_switch-color-surface-selected));
  --_switch-color-icon-selected-focused: var(--switch-color-icon-selected-focused-light, var(--_switch-color-surface-selected));
  --_switch-color-icon-selected-disabled: var(--switch-color-icon-selected-disabled-light, var(--brand-color-gray-cement));

  --_switch-color-label-selected: var(--switch-color-label-selected-light, var(--brand-color-anthracite-0));
  --_switch-color-label-unselected: var(--switch-color-label-unselected-light, var(--_switch-color-label-selected));
  --_switch-color-label-unselected-hover: var(--switch-color-label-unselected-hover-light, var(--_switch-color-label-selected));
  --_switch-color-label-unselected-disabled: var(--switch-color-label-unselected-disabled-light, var(--_switch-color-label-selected));
  --_switch-color-label-unselected-focused: var(--switch-color-label-unselected-focused-light, var(--_switch-color-label-selected));
  --_switch-color-label-selected-focused: var(--switch-color-label-selected-focused-light, var(--_switch-color-label-selected));
  --_switch-color-label-selected-disabled: var(--switch-color-label-selected-disabled-light, var(--_switch-color-label-selected));

  /**
  Styles
   */
  --_switch-color-surface: var(--_switch-color-surface-unselected);
  --_switch-color-track: var(--_switch-color-track-unselected);
  --_switch-color-icon: var(--_switch-color-icon-selected);
  --_switch-color-label: var(--_switch-color-label-unselected);
  --_switch-icon-opacity: 0;

  display: inline-grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: auto var(--_switch-inline-size);
  font-size: var(--_switch-font-size);
  font-weight: 400;

  // &:focus-visible {
  &:has(:focus-visible) {
    outline: 1px solid;
    outline-offset: var(--_switch-track-spacing);
  }

  #{$self}:not(&--is-active):is(:hover, :active, :focus, .switch--fake-hover, .switch--fake-focus), &:focus-within {
    --_switch-color-surface: var(--_switch-color-surface-unselected-hover);
    --_switch-color-track: var(--_switch-color-track-unselected-hover);
    --_switch-color-label: var(--_switch-color-label-unselected-hover);
  }

  &--is-active {
    --_switch-color-surface: var(--_switch-color-surface-selected);
    --_switch-color-track: var(--_switch-color-track-selected);
    --_switch-color-icon: var(--_switch-color-icon-selected);
    --_switch-color-label: var(--_switch-color-label-selected);
    --_switch-icon-opacity: 1;
  }

  &__presentation {
    display: grid;
    align-items: center;
    block-size: var(--_switch-block-size);
    inline-size: var(--_switch-inline-size);
    border-radius: var(--_switch-radius);
    background-color: var(--_switch-color-surface);
    position: relative;
    // transition: all 0.2s ease;
    // transition-behavior: allow-discrete;
    #{$self}--is-active & {
      // justify-content: end;
    }
  }

  &__icon {
    opacity: var(--_switch-icon-opacity);
  }

  &__input {
    @include utilities.visually-hidden();
    // display: none;
  }

  &__label {
    order: -1;
    color: var(--_switch-color-label-unselected);
    user-select: none;
  }

  &__track {
    --_switch-track-position: 0;
    display: grid;
    place-items: center;
    block-size: var(--_switch-track-size);
    margin: var(--_switch-track-spacing);
    aspect-ratio: 1;
    background-color: var(--_switch-color-track);
    color: var(--_switch-color-icon-selected);
    position: absolute;
    translate: var(--_switch-track-position) 0;
    /* justify-self: start;
    transition: all 2s ease;
    transition-behavior: allow-discrete; */
    transition: all 600ms ease;

    border-radius: calc(infinity * 1px);

    #{$self}--is-active & {
      --_switch-track-position: calc((var(--_switch-inline-size) - (2 * var(--_switch-track-spacing))) - (var(--_switch-track-size) + (2 * var(--_switch-track-spacing))));
      // justify-self: end;
    }
  }


  &:is([data-theme='dark']) {
    /**
      Dark Mode Tokens
    */
    --_switch-color-surface-selected: var(--switch-color-surface-selected-dark, var(--brand-color-white-0));
    --_switch-color-surface-unselected: var(--switch-color-surface-unselected-dark, var(--_switch-color-track-selected));
    --_switch-color-surface-unselected-hover: var(--switch-color-surface-unselected-hover-dark, var(--_switch-color-track-selected));
    --_switch-color-surface-unselected-disabled: var(--switch-color-surface-unselected-disabled-dark, var(--brand-color-gray-cement));
    --_switch-color-surface-unselected-focused: var(--switch-color-surface-unselected-focused-dark, var(--_switch-color-track-selected));
    --_switch-color-surface-selected-focused: var(--switch-color-surface-selected-focused-dark, var(--_switch-color-track-selected));
    --_switch-color-surface-selected-disabled: var(--switch-color-surface-selected-disabled-dark, var(--brand-color-gray-stone));

    --_switch-color-icon-selected: var(--switch-color-icon-selected-dark, var(--_switch-color-surface-selected));
    --_switch-color-icon-selected-focused: var(--switch-color-icon-selected-focused-dark, var(--_switch-color-surface-selected));
    --_switch-color-icon-selected-disabled: var(--switch-color-icon-selected-disabled-dark, var(--_switch-color-surface-selected-disabled));

    --_switch-color-label-selected: var(--switch-color-label-selected-dark, var(--brand-color-white-0));
    --_switch-color-label-unselected: var(--switch-color-label-unselected-dark, var(--_-switch-color-label-selected));
    --_switch-color-label-unselected-hover: var(--switch-color-label-unselected-hover-dark, var(--_-switch-color-label-selected));
    --_switch-color-label-unselected-disabled: var(--switch-color-label-unselected-disabled-dark, var(--_-switch-color-label-selected));
    --_switch-color-label-unselected-focused: var(--switch-color-label-unselected-focused-dark, var(--_-switch-color-label-selected));
    --_switch-color-label-selected-focused: var(--switch-color-label-selected-focused-dark, var(--_-switch-color-label-selected));
    --_switch-color-label-selected-disabled: var(--switch-color-label-selected-disabled-dark, var(--_-switch-color-label-selected));
  }
}
</style>
