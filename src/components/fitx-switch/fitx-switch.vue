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
  fakeModifier?: 'none' | 'hover' | 'focus' | 'active'; // Dev Mode only @TODO remove from export on build
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
  ...getModifierClasses('button', props.modifier ?? []),
  ...getModifierClasses('switch', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('button', toValue(modelValue) ? 'is-active' : []),
]);
</script>

<template>
  <label
    class="switch"
    :class="componentClasses">
    <input
      role="switch"
      :id="props.id"
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
  --_switch-color-surface-light-selected: var(--switch-color-surface-light-selected, var(--functional-color-success-0));
  --_switch-color-surface-light-unselected: var(--switch-color-surface-light-unselected, var(--brand-color-gray-stone));
  --_switch-color-surface-light-unselected-hover: var(--switch-color-surface-light-unselected-hover, var(--brand-color-gray-graphite));
  --_switch-color-surface-light-unselected-disabled: var(--switch-color-surface-light-unselected-disabled, var(--brand-color-gray-chalk));
  --_switch-color-surface-light-unselected-focused: var(--switch-color-surface-light-unselected-focused, var(--brand-color-gray-graphite));
  --_switch-color-surface-light-selected-focused: var(--switch-color-surface-light-selected-focused, var(--_switch-color-surface-light-selected));
  --_switch-color-surface-light-selected-disabled: var(--switch-color-surface-light-selected-disabled, var(--brand-color-gray-plumb));

  --_switch-color-surface-light-track-selected: var(--switch-color-surface-light-track-selected, var(--brand-color-white-0));
  --_switch-color-surface-light-track-unselected: var(--switch-color-surface-light-track-unselected, var(--_switch-color-surface-light-track-selected));
  --_switch-color-surface-light-track-unselected-hover: var(--switch-color-surface-light-track-unselected-hover, var(--_switch-color-surface-light-track-selected));
  --_switch-color-surface-light-track-unselected-disabled: var(--switch-color-surface-light-track-unselected-disabled, var(--_switch-color-surface-light-track-selected));
  --_switch-color-surface-light-track-unselected-focused: var(--switch-color-surface-light-track-unselected-focused, var(--_switch-color-surface-light-track-selected));
  --_switch-color-surface-light-track-selected-focused: var(--switch-color-surface-light-track-selected-focused, var(--_switch-color-surface-light-track-selected));
  --_switch-color-surface-light-track-selected-disabled: var(--switch-color-surface-light-track-selected-disabled, var(--_switch-color-surface-light-track-selected));

  --_switch-color-surface-light-icon-selected: var(--switch-color-surface-light-icon-selected, var(--_switch-color-surface-light-selected));
  --_switch-color-surface-light-icon-selected-focused: var(--switch-color-surface-light-icon-selected-focused, var(--_switch-color-surface-light-selected));
  --_switch-color-surface-light-icon-selected-disabled: var(--switch-color-surface-light-icon-selected-disabled, var(--brand-color-gray-cement));

  --_switch-color-surface-light-label-selected: var(--switch-color-surface-light-label-selected, var(--brand-color-anthracite-0));
  --_switch-color-surface-light-label-unselected: var(--switch-color-surface-light-label-unselected, var(--_switch-color-surface-light-label-selected));
  --_switch-color-surface-light-label-unselected-hover: var(--switch-color-surface-light-label-unselected-hover, var(--_switch-color-surface-light-label-selected));
  --_switch-color-surface-light-label-unselected-disabled: var(--switch-color-surface-light-label-unselected-disabled, var(--_switch-color-surface-light-label-selected));
  --_switch-color-surface-light-label-unselected-focused: var(--switch-color-surface-light-label-unselected-focused, var(--_switch-color-surface-light-label-selected));
  --_switch-color-surface-light-label-selected-focused: var(--switch-color-surface-light-label-selected-focused, var(--_switch-color-surface-light-label-selected));
  --_switch-color-surface-light-label-selected-disabled: var(--switch-color-surface-light-label-selected-disabled, var(--_switch-color-surface-light-label-selected));

  /**
  Dark Mode Tokens
   */
  --_switch-color-surface-dark-selected: var(--switch-color-surface-dark-selected, var(--functional-color-success-0));
  --_switch-color-surface-dark-unselected: var(--switch-color-surface-dark-unselected, var(--brand-color-gray-graphite));
  --_switch-color-surface-dark-unselected-hover: var(--switch-color-surface-dark-unselected-hover, var(--brand-color-gray-stone));
  --_switch-color-surface-dark-unselected-disabled: var(--switch-color-surface-dark-unselected-disabled, var(--brand-color-gray-carbon));
  --_switch-color-surface-dark-unselected-focused: var(--switch-color-surface-dark-unselected-focused, var(--brand-color-gray-graphite));
  --_switch-color-surface-dark-selected-focused: var(--switch-color-surface-dark-selected-focused, var(--_switch-color-surface-dark-selected));
  --_switch-color-surface-dark-selected-disabled: var(--switch-color-surface-dark-selected-disabled, var(--brand-color-gray-cement));

  --_switch-color-surface-dark-track-selected: var(--switch-color-surface-dark-track-selected, var(--brand-color-white-0));
  --_switch-color-surface-dark-track-unselected: var(--switch-color-surface-dark-track-unselected, var(--_switch-color-surface-dark-track-selected));
  --_switch-color-surface-dark-track-unselected-hover: var(--switch-color-surface-dark-track-unselected-hover, var(--_switch-color-surface-dark-track-selected));
  --_switch-color-surface-dark-track-unselected-disabled: var(--switch-color-surface-dark-track-unselected-disabled, var(--brand-color-gray-cement));
  --_switch-color-surface-dark-track-unselected-focused: var(--switch-color-surface-dark-track-unselected-focused, var(--_switch-color-surface-dark-track-selected));
  --_switch-color-surface-dark-track-selected-focused: var(--switch-color-surface-dark-track-selected-focused, var(--_switch-color-surface-dark-track-selected));
  --_switch-color-surface-dark-track-selected-disabled: var(--switch-color-surface-dark-track-selected-disabled, var(--brand-color-gray-stone));

  --_switch-color-surface-dark-icon-selected: var(--switch-color-surface-dark-icon-selected, var(--_switch-color-surface-dark-selected));
  --_switch-color-surface-dark-icon-selected-focused: var(--switch-color-surface-dark-icon-selected-focused, var(--_switch-color-surface-dark-selected));
  --_switch-color-surface-dark-icon-selected-disabled: var(--switch-color-surface-dark-icon-selected-disabled, var(--_switch-color-surface-dark-selected-disabled));

  --_switch-color-surface-dark-label-selected: var(--switch-color-surface-dark-label-selected, var(--brand-color-white-0));
  --_switch-color-surface-dark-label-unselected: var(--switch-color-surface-dark-label-unselected, var(--_switch-color-surface-dark-label-selected));
  --_switch-color-surface-dark-label-unselected-hover: var(--switch-color-surface-dark-label-unselected-hover, var(--_switch-color-surface-dark-label-selected));
  --_switch-color-surface-dark-label-unselected-disabled: var(--switch-color-surface-dark-label-unselected-disabled, var(--_switch-color-surface-dark-label-selected));
  --_switch-color-surface-dark-label-unselected-focused: var(--switch-color-surface-dark-label-unselected-focused, var(--_switch-color-surface-dark-label-selected));
  --_switch-color-surface-dark-label-selected-focused: var(--switch-color-surface-dark-label-selected-focused, var(--_switch-color-surface-dark-label-selected));
  --_switch-color-surface-dark-label-selected-disabled: var(--switch-color-surface-dark-label-selected-disabled, var(--_switch-color-surface-dark-label-selected));

  /**
  Styles
   */
  --_switch-color-surface: var(--_switch-color-surface-light-label-selected);
  --_switch-color-surface-track: var(--_switch-color-surface-light-track-selected);
  --_switch-color-surface-icon: var(--_switch-color-surface-light-icon-selected);
  --_switch-color-surface-label: var(--_switch-color-surface-light-label-selected);


  display: inline-grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: auto var(--_switch-inline-size);
  font-size: var(--_switch-font-size);
  font-weight: 400;

  &__presentation {
    display: flex;
    align-items: center;
    block-size: var(--_switch-block-size);
    inline-size: var(--_switch-inline-size);
    border-radius: var(--_switch-radius);
    background-color: var(--_switch-color-surface);
    &:hover {
      justify-content: end;
    }
  }

  &__input {
    display: none;
  }

  &__label {
    order: -1;
  }

  &__track {
    display: grid;
    place-items: center;
    block-size: var(--_switch-track-size);
    margin: 2px;
    aspect-ratio: 1;
    background-color: var(--_switch-color-surface-track);

    border-radius: calc(infinity * 1px);

  }


  &:is([data-theme='dark']) {
    --_switch-color-surface: var(--_switch-color-surface-dark-label-selected);
    --_switch-color-surface-track: var(--_switch-color-surface-dark-track-selected);
    --_switch-color-surface-icon: var(--_switch-color-surface-dark-icon-selected);
    --_switch-color-surface-label: var(--_switch-color-surface-dark-label-selected);
  }
}
</style>
