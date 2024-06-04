<script lang="ts">
import type { Theme } from '@/types';

export const buttonStates = ['disabled'] as const;

export type FitxSwitchProps = {
  theme?: Theme;
  label: string,
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus' | 'active'; // Dev Mode only @TODO remove from export on build
};
</script>
<script lang="ts" setup>
const props = withDefaults(defineProps<FitxSwitchProps>(), {
  label: 'n bissle text',
})
</script>

<template>
  <label class="switch">
    <input
      role="switch"
      class="switch__input"
      type="checkbox">
    <span class="switch__presentation">
      <span class="switch__track" />
    </span>
    <span class="switch__label">{{ props.label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.switch {
  --_switch-block-size: var(--switch-block-size, var(--size-7));
  --_switch-inline-size: var(--switch-inline-size, var(--size-8));
  --_switch-radius: var(--switch-radius, var(--radius-7));
  --_switch-track-spacing: var(--switch-track-spacing, 2px);
  --_switch-track-size: var(--switch-track-size, calc(100% - (2 * var(--_switch-track-spacing))));

  /**
  Light Mode Tokens
   */
  --_switch-color-surface-light: var(--switch-color-surface-light, green);
  --_switch-color-surface-light-unselected: var(--switch-color-surface-light-unselected, green);
  --_switch-color-surface-light-unselected-hover: var(--switch-color-surface-light-unselected-hover, green);
  --_switch-color-surface-light-unselected-disabled: var(--switch-color-surface-light-unselected-disabled, green);
  --_switch-color-surface-light-unselected-focused: var(--switch-color-surface-light-unselected-focused, green);
  --_switch-color-surface-light-selected-focused: var(--switch-color-surface-light-selected-focused, green);
  --_switch-color-surface-light-selected-disabled: var(--switch-color-surface-light-selected-disabled, green);

  --_switch-color-surface-light-track: var(--switch-color-surface-light-track, green);
  --_switch-color-surface-light-track-unselected: var(--switch-color-surface-light-track-unselected, green);
  --_switch-color-surface-light-track-unselected-hover: var(--switch-color-surface-light-track-unselected-hover, green);
  --_switch-color-surface-light-track-unselected-disabled: var(--switch-color-surface-light-track-unselected-disabled, green);
  --_switch-color-surface-light-track-unselected-focused: var(--switch-color-surface-light-track-unselected-focused, green);
  --_switch-color-surface-light-track-selected-focused: var(--switch-color-surface-light-track-selected-focused, green);
  --_switch-color-surface-light-track-selected-disabled: var(--switch-color-surface-light-track-selected-disabled, green);

  --_switch-color-surface-light-icon: var(--switch-color-surface-light-icon, green);
  --_switch-color-surface-light-icon-selected-focused: var(--switch-color-surface-light-icon-selected-focused, green);
  --_switch-color-surface-light-icon-selected-disabled: var(--switch-color-surface-light-icon-selected-disabled, green);

  --_switch-color-surface-light-label: var(--switch-color-surface-light-label, green);
  --_switch-color-surface-light-label-unselected: var(--switch-color-surface-light-label-unselected, green);
  --_switch-color-surface-light-label-unselected-hover: var(--switch-color-surface-light-label-unselected-hover, green);
  --_switch-color-surface-light-label-unselected-disabled: var(--switch-color-surface-light-label-unselected-disabled, green);
  --_switch-color-surface-light-label-unselected-focused: var(--switch-color-surface-light-label-unselected-focused, green);
  --_switch-color-surface-light-label-selected-focused: var(--switch-color-surface-light-label-selected-focused, green);
  --_switch-color-surface-light-label-selected-disabled: var(--switch-color-surface-light-label-selected-disabled, green);

  /**
  Dark Mode Tokens
   */
  --_switch-color-surface-dark: var(--switch-color-surface-dark, green);
  --_switch-color-surface-dark-unselected: var(--switch-color-surface-dark-unselected, green);
  --_switch-color-surface-dark-unselected-hover: var(--switch-color-surface-dark-unselected-hover, green);
  --_switch-color-surface-dark-unselected-disabled: var(--switch-color-surface-dark-unselected-disabled, green);
  --_switch-color-surface-dark-unselected-focused: var(--switch-color-surface-dark-unselected-focused, green);
  --_switch-color-surface-dark-selected-focused: var(--switch-color-surface-dark-selected-focused, green);
  --_switch-color-surface-dark-selected-disabled: var(--switch-color-surface-dark-selected-disabled, green);

  --_switch-color-surface-dark-track: var(--switch-color-surface-dark-track, green);
  --_switch-color-surface-dark-track-unselected: var(--switch-color-surface-dark-track-unselected, green);
  --_switch-color-surface-dark-track-unselected-hover: var(--switch-color-surface-dark-track-unselected-hover, green);
  --_switch-color-surface-dark-track-unselected-disabled: var(--switch-color-surface-dark-track-unselected-disabled, green);
  --_switch-color-surface-dark-track-unselected-focused: var(--switch-color-surface-dark-track-unselected-focused, green);
  --_switch-color-surface-dark-track-selected-focused: var(--switch-color-surface-dark-track-selected-focused, green);
  --_switch-color-surface-dark-track-selected-disabled: var(--switch-color-surface-dark-track-selected-disabled, green);

  --_switch-color-surface-dark-icon: var(--switch-color-surface-dark-icon, green);
  --_switch-color-surface-dark-icon-selected-focused: var(--switch-color-surface-dark-icon-selected-focused, green);
  --_switch-color-surface-dark-icon-selected-disabled: var(--switch-color-surface-dark-icon-selected-disabled, green);

  --_switch-color-surface-dark-label: var(--switch-color-surface-dark-label, green);
  --_switch-color-surface-dark-label-unselected: var(--switch-color-surface-dark-label-unselected, green);
  --_switch-color-surface-dark-label-unselected-hover: var(--switch-color-surface-dark-label-unselected-hover, green);
  --_switch-color-surface-dark-label-unselected-disabled: var(--switch-color-surface-dark-label-unselected-disabled, green);
  --_switch-color-surface-dark-label-unselected-focused: var(--switch-color-surface-dark-label-unselected-focused, green);
  --_switch-color-surface-dark-label-selected-focused: var(--switch-color-surface-dark-label-selected-focused, green);
  --_switch-color-surface-dark-label-selected-disabled: var(--switch-color-surface-dark-label-selected-disabled, green);


  /**
  Styles
   */
  --_switch-color-surface: var(--switch-color-surface-light, green);
  --_switch-color-surface-track: var(--switch-color-surface-light-track, green);
  --_switch-color-surface-icon: var(--switch-color-surface-light-icon, green);
  --_switch-color-surface-label: var(--switch-color-surface-light-label, green);

  display: inline-grid;
  grid-template-columns: auto var(--_switch-size);

  &__presentation {
    border: 1px solid red;
    display: flex;
    align-items: center;
    block-size: var(--_switch-block-size);
    inline-size: var(--_switch-inline-size);
    border-radius: var(--_switch-radius);
  }

  &__input {
    display: none;
  }

  &__label {
    order: -1;
  }

  &__track {
    block-size: var(--_switch-track-size);
    margin: 2px;
    aspect-ratio: 1;
    background-color: var(--_switch-color-surface-light-track);
    border-radius: calc(infinity * 1px);
  }


  &:is([data-theme='dark']) {
    --_switch-color-surface: var(--_switch-color-surface-dark);
    --_switch-color-surface-track: var(--switch-color-surface-dark-track, green);
    --_switch-color-surface-icon: var(--switch-color-surface-dark-icon, green);
    --_switch-color-surface-label: var(--switch-color-surface-dark-label, green);
  }
}
</style>
