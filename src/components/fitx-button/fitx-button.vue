<script lang="ts" setup>
import { IconClose } from '@/components/icons';
import { type Theme, type ButtonSize, buttonStates } from '@/types';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

// type FakeStates = 'hover' | 'focus' | 'active';
// export type ButtonState = 'disabled' | 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type ButtonState = typeof buttonStates[number];

const {
  theme,
  tag = 'button',
  size = 'default',
  modifier,
  fakeModifier,
} = defineProps<{
  theme?: Theme,
  tag?: 'button' | 'span',
  size?: ButtonSize,
  modifier?: ButtonState | ButtonState[],
  fakeModifier?: 'hover' | 'focus' | 'active', // Dev Mode only @TODO remove from export on build
}>();

/* const componentClasses = computed(() => {
  const sizes = size ? [`size-${size}`] : [];
  let modifierList: ButtonState[] = [];
  if (modifier) {
    if (typeof modifier === 'string') {
      modifierList.push(modifier);
    } else {
      modifierList = modifier;
    }
  }
  return getModifierClasses('button', [...sizes, ...modifierList]);
});
 */
const componentClasses = computed(() => (
  [
    ...getModifierClasses('button', size ? `size-${size}` : []),
    ...getModifierClasses('button', modifier ?? []),
    ...getModifierClasses('button', fakeModifier ? `fake-${fakeModifier}` : []),
  ]
));
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
.button {
  $self: &;
  --_button-spacing-inline: var(--button-spacing-inline, var(--size-px-8));
  --_button-spacing-block: var(--button-spacing-block, var(--size-px-3));
  --_button-radius: var(--button-radius, var(--radius-10));
  --_button-border-width: var(--button-border-width, 2px);
  --_button-font-size: var(--button-font-size, 1.125rem);
  // primary Styles
  --_button-color-surface: var(--button-color-primary-surface-light, var(--brand-color-orange-0));
  --_button-color-border: var(--button-color-primary-border-light, var(--brand-color-orange-0));
  --_button-color-surface-hover: var(--button-color-primary-surface-hover-light, var(--brand-color-orange-1));
  --_button-color-text: var(--button-color-primary-text-light, var(--brand-color-white-0));
  // disabled
  --_button-color-surface-disabled: var(--button-color-primary-surface-disabled-light, var(--brand-color-gray-chalk));
  --_button-color-border-disabled: var(--button-color-primary-border-disabled-light, var(--brand-color-gray-chalk));
  --_button-color-text-disabled: var(--button-color-primary-text-disabled-light, var(--brand-color-gray-cement));

  &--size-small {
    --_button-spacing-inline: var(--button-spacing-inline, var(--size-px-4));
    --_button-spacing-block: var(--button-spacing-block, var(--size-px-2));
    --_button-radius: var(--button-radius, var(--radius-7));
  }

  &--secondary {
    // secondary Styles
    --_button-color-surface: var(--button-color-secondary-surface-light, var(--brand-color-white-0));
    --_button-color-border: var(--button-color-secondary-border-light, var(--brand-color-anthracite-0));
    --_button-color-surface-hover: var(--button-color-secondary-surface-hover-light, var(--brand-color-white-1));
    --_button-color-text: var(--button-color-secondary-text-light, var(--brand-color-anthracite-0));
    // disabled
    --_button-color-surface-disabled: var(--button-color-secondary-surface-disabled-light, var(--brand-color-white-0));
    --_button-color-border-disabled: var(--button-color-secondary-border-disabled-light, var(--brand-color-gray-ash));
    --_button-color-text-disabled: var(--button-color-secondary-text-disabled-light, var(--brand-color-gray-cement));
  }

  &--tertiary {
    // tertiary Styles
    --_button-color-surface: var(--button-color-tertiary-surface-light, var(--brand-color-white-0));
    --_button-color-border: var(--button-color-tertiary-border-light, var(--brand-color-white-0));
    --_button-color-surface-hover: var(--button-color-tertiary-surface-hover-light, var(--brand-color-white-1));
    --_button-color-text: var(--button-color-tertiary-text-light, var(--brand-color-anthracite-0));
    // disabled
    --_button-color-surface-disabled: var(--button-color-tertiary-surface-disabled-light, var(--brand-color-white-0));
    --_button-color-border-disabled: var(--button-color-tertiary-border-disabled-light, var(--_button-color-surface-disabled));
    --_button-color-text-disabled: var(--button-color-tertiary-text-disabled-light, var(--brand-color-gray-cement));
  }

  &--quaternary {
    // quaternary Styles
    --_button-color-surface: var(--button-color-quaternary-surface-light, var(--brand-color-white-0));
    --_button-color-border: var(--button-color-quaternary-border-light, var(--brand-color-white-0));
    --_button-color-surface-hover: var(--button-color-quaternary-surface-hover-light, var(--brand-color-white-1));
    --_button-color-text: var(--button-color-quaternary-text-light, var(--brand-color-anthracite-0));
    // disabled
    --_button-color-surface-disabled: var(--button-color-quaternary-surface-disabled-light, var(--brand-color-white-1));
    --_button-color-border-disabled: var(--button-color-quaternary-border-disabled-light, var(--_button-color-surface-disabled));
    --_button-color-text-disabled: var(--button-color-quaternary-text-disabled-light, var(--brand-color-gray-cement));
  }

  background: var(--_button-color-surface);
  color: var(--_button-color-text);
  font-size: var(--_button-font-size);
  font-weight: 400;
  border: var(--_button-border-width) solid var(--_button-color-border);
  border-radius: var(--_button-radius);
  padding-block: var(--_button-spacing-block);
  padding-inline: var(--_button-spacing-inline);

  &:is(:hover, :active, :focus, #{$self}--fake-hover) {
    --_button-color-surface: var(--_button-color-surface-hover);
  }

  &:is(:disabled, #{$self}--disabled) {
    --_button-color-surface: var(--_button-color-surface-disabled);
    --_button-color-text: var(--_button-color-text-disabled);
    --_button-color-border: var(--_button-color-border-disabled);
  }

  &[data-theme=darki] {
    // primary
    --_button-color-surface: var(--button-color-primary-surface-dark, var(--brand-color-orange-0));
    --_button-color-border: var(--button-color-primary-border-dark, var(--brand-color-orange-0));
    --_button-color-surface-hover: var(--button-color-primary-surface-hover-dark, var(--brand-color-orange-1));
    --_button-color-text: var(--button-color-primary-text-dark, var(--brand-color-white-0));
    // primary disabled
    --_button-color-surface-disabled: var(--button-color-primary-surface-disabled-dark, var(--brand-color-orange-0));
    --_button-color-border-disabled: var(--button-color-primary-border-disabled-dark, var(--brand-color-orange-0));
    --_button-color-text-disabled: var(--button-color-primary-text-disabled-dark, var(--brand-color-white-0));
  }
}
</style>
