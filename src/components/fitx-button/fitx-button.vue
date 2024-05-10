<script lang="ts" setup>
import { IconClose } from '@/components/icons';
import { type Theme, type ButtonSize, buttonStates } from '@/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

// type FakeStates = 'hover' | 'focus' | 'active';
// export type ButtonState = 'disabled' | 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type ButtonState = typeof buttonStates[number] | typeof buttonStates;

const {
  theme,
  tag = 'button',
  size = 'default',
  modifier,
} = defineProps<{
  theme?: Theme,
  tag?: 'button' | 'span',
  size?: ButtonSize,
  modifier?: ButtonState,
  fakeModifier?: 'hover' | 'focus' | 'active', // Dev Mode only @TODO remove from export on build
}>();

const componentClasses = computed(() => getModifierClasses('button', [size]));
</script>
<template>
  <component
    :is="tag"
    :data-theme="theme"
    class="button"
    :class="componentClasses">
    <slot name="icon-start"></slot>
    <slot name="default">{{ modifier }}</slot>
    <slot name="icon-end" />
  </component>
</template>

<style lang="scss" scoped>
button {
  --_button-color-primary-surface-light: var(--button-color-primary-surface-light, var(--brand-color-orange-0));
  --_button-color-primary-border-light: var(--button-color-primary-border-light, var(--brand-color-orange-0));
  --_button-color-primary-surface-hover-light: var(--button-color-primary-surface-hover-light, var(--brand-color-orange-1));
  --_button-color-primary-text-light: var(--button-color-primary-text-light, var(--brand-color-white-0));
  // disabled
  --_button-color-primary-surface-disabled-light: var(--button-color-primary-surface-disabled-light, var(--brand-color-orange-0));
  --_button-color-primary-border-disabled-light: var(--button-color-primary-border-disabled-light, var(--brand-color-orange-0));
  --_button-color-primary-text-disabled-light: var(--button-color-primary-text-disabled-light, var(--brand-color-white-0));

  &[data-theme=dark] {

  }
}
</style>
