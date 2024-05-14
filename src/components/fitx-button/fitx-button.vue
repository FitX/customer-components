<script lang="ts">
import type { Theme } from '@/types';
export type ButtonSize = 'default' | 'small';
export const buttonStates = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'disabled',
] as const;
export type ButtonState = typeof buttonStates[number];
</script>

<script lang="ts" setup>
import { IconClose } from '@/components/icons';

import { getModifierClasses } from '@/utils/css-modifier';
import { computed } from 'vue';

// type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

// type FakeStates = 'hover' | 'focus' | 'active';
// export type ButtonState = 'disabled' | 'primary' | 'secondary' | 'tertiary' | 'quaternary';
const props = withDefaults(defineProps<{
  theme?: Theme,
  tag?: 'button' | 'span',
  size?: ButtonSize,
  isActive?: boolean,
  modifier?: ButtonState | ButtonState[],
  fakeModifier?: 'hover' | 'focus' | 'active', // Dev Mode only @TODO remove from export on build
}>(), {
  tag: 'button',
  size: 'default',
});

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
    ...getModifierClasses('button', props.size ? `size-${props.size}` : []),
    ...getModifierClasses('button', props.modifier ?? []),
    ...getModifierClasses('button', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
    ...getModifierClasses('button', props.isActive ? 'is-active' : []),
  ]
));
</script>
<template>
  <component
    :is="props.tag"
    :data-theme="props.theme"
    class="button"
    :class="componentClasses">
    <!--
    @slot optional Icon Slot
    -->
    <slot name="icon-start">
      <span />
    </slot>
    <slot name="default">{{ props.modifier }}</slot>
    <slot name="icon-end">
      <span
        v-show="props.isActive"
        class="button__loading" />
    </slot>
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/normalize.scss' as normalize;

.button {
  @include normalize.btn();

  $self: &;
  --_button-spacing-inline: var(--button-spacing-inline, var(--size-px-8));
  --_button-spacing-block: var(--button-spacing-block, var(--size-px-3));
  --_button-radius: var(--button-radius, var(--radius-10));
  --_button-border-width: var(--button-border-width, 2px);
  --_button-font-size: var(--button-font-size, 1.125rem);
  --_button-loader-size: var(--button-loader-size, calc(var(--_button-font-size) / 2));
  --_button-content-gap: var(--button-content-gap, var(--size-px-2));
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

  &:is([data-theme=dark]) {
    // primary Styles
    --_button-color-surface: var(--button-color-primary-surface-dark, var(--brand-color-orange-0));
    --_button-color-border: var(--button-color-primary-border-dark, var(--brand-color-orange-0));
    --_button-color-surface-hover: var(--button-color-primary-surface-hover-dark, var(--brand-color-orange-1));
    --_button-color-text: var(--button-color-primary-text-dark, var(--brand-color-white-0));
    // disabled
    --_button-color-surface-disabled: var(--button-color-primary-surface-disabled-dark, var(--brand-color-anthracite-3));
    --_button-color-border-disabled: var(--button-color-primary-border-disabled-dark, var(--button-color-primary-surface-disabled-dark));
    --_button-color-text-disabled: var(--button-color-primary-text-disabled-dark, var(--brand-color-gray-cement));
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

    &:is([data-theme=dark]) {
      // secondary Styles
      --_button-color-surface: var(--button-color-secondary-surface-dark, var(--brand-color-anthracite-0));
      --_button-color-border: var(--button-color-secondary-border-dark, var(--brand-color-white-0));
      --_button-color-surface-hover: var(--button-color-secondary-surface-hover-dark, var(--brand-color-anthracite-3));
      --_button-color-text: var(--button-color-secondary-text-dark, var(--brand-color-white-0));
      // disabled
      --_button-color-surface-disabled: var(--button-color-secondary-surface-disabled-dark, var(--button-color-secondary-surface-dark));
      --_button-color-border-disabled: var(--button-color-secondary-border-disabled-dark, var(--brand-color-anthracite-3));
      --_button-color-text-disabled: var(--button-color-secondary-text-disabled-dark, var(--brand-color-gray-cement));
    }
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

    &:is([data-theme=dark]) {
      // secondary Styles
      --_button-color-surface: var(--button-color-tertiary-surface-dark, var(--brand-color-anthracite-0));
      --_button-color-border: var(--button-color-tertiary-border-dark, var(--button-color-tertiary-surface-dark));
      --_button-color-surface-hover: var(--button-color-tertiary-surface-hover-dark, var(--brand-color-anthracite-3));
      --_button-color-text: var(--button-color-tertiary-text-dark, var(--brand-color-white-0));
      // disabled
      --_button-color-surface-disabled: var(--button-color-tertiary-surface-disabled-dark, var(--button-color-tertiary-surface-dark));
      --_button-color-border-disabled: var(--button-color-tertiary-border-disabled-dark, var(--_button-color-surface-disabled));
      --_button-color-text-disabled: var(--button-color-tertiary-text-disabled-dark, var(--brand-color-gray-cement));
    }
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

  // display: inline-block;
  display: inline-grid;
  grid-template-columns: var(--_button-loader-size) 1fr var(--_button-loader-size);
  gap: var(--_button-content-gap);
  align-items: center;

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

  &--is-active {
    transition: 0.4s ease grid-template-columns;

    #{$self}__loading {
      display: inline-block;
      aspect-ratio: 1;
      max-height: var(--_button-loader-size);
      right: var(--_button-loader-size);

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 0.2rem solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: ring 1s linear infinite;
      }

      @keyframes ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
