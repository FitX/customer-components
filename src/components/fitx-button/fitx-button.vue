
<script lang="ts" setup>
import { GymxButton } from '@fitx/gymx-ui';

import type { FitxButtonProps, FitxButtonSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
const slots = defineSlots<FitxButtonSlots>();

const props = withDefaults(defineProps<FitxButtonProps>(), {
  size: 'default',
  modifier: 'primary',
});
</script>
<template>
  <gymx-button
    class="btn"
    :class="[
      getModifierClasses('btn', [props.size, props.modifier]),
      getModifierClasses('btn', props.isIdle ? 'is-idle' : undefined),
    ]"
    :state="props.state"
    :tag="props.tag">
    <template #icon-start>
      <slot name="icon-start"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #icon-end>
      <slot name="icon-end">
      </slot>
      <span
        v-if="props.isIdle"
        class="btn__loading" />
    </template>
  </gymx-button>
</template>
<style lang="scss" scoped>
.btn {
  $self: &;

  --button-color: var(--fitx-button-color, var(--primary-brand-color-white));
  --button-color-background: var(--fitx-button-color-background, var(--primary-brand-color-orange));

  --button-padding-inline: var(--fitx-size-large);
  --button-padding-block: var(--fitx-size-small);
  --button-radius: var(--fitx-radius-10);
  --button-font-weight: 500;

  --button-icon-size: var(--icon-size-px-mini);
  --button-icon-size-start: var(--btn-icon-size);
  --button-icon-size-end: var(--btn-icon-size);

  --_button-border-width: 2px;
  --_button-border-color: var(--button-color-background);

  --button-border: var(--_button-border-width) solid var(--_button-border-color);
  --button-font-size: inherit;
  --button-font-family: var(--font-stack-normal);
  --button-idle-color: var(--brand-color-white-0);

  &:is(&--small) {
    --button-padding-inline: var(--fitx-size-standard);
    --button-padding-block: var(--fitx-size-tiny);
  }

  &:is(:hover, &--hover, :focus-visible, :active, &--active) {
    --button-color-background: var(--brand-color-orange-1);
  }

  &:is(:disabled, &--disabled) {
    --button-color: var(--brand-color-gray-cement);
    --button-color-background: var(--brand-color-gray-chalk);
  }

  &:is(&--secondary) {
    --_button-border-color: var(--brand-color-anthracite-0);
    --button-color: var(--brand-color-anthracite-0);
    --button-color-background: transparent;
    --button-idle-color: var(--button-color);

    &:is(:hover, #{$self}--hover, :focus-visible) {
      --button-color-background: var(--brand-color-gray-chalk);
    }

    &:is(:disabled, #{$self}--disabled) {
      --_button-border-color: var(--brand-color-gray-ash);
      --button-color: var(--brand-color-gray-cement);
      --button-color-background: transparent;
    }
  }

  &:is(&--tertiary) {
    --button-color: var(--brand-color-anthracite-0);
    --button-color-background: var(--brand-color-white-0);
    --button-idle-color: var(--button-color);

    &:is(:hover, #{$self}--hover, :focus-visible) {
      --button-color-background: var(--brand-color-gray-chalk);
    }

    &:is(:disabled, #{$self}--disabled) {
      --button-color: var(--brand-color-gray-cement);
      --button-color-background: var(--brand-color-white-0);
    }
  }

  &--is-idle {
    transition: 0.4s ease grid-template-columns;

    #{$self}__loading {
      display: inline-block;
      aspect-ratio: 1;
      max-height: var(--_button-icon-size, 18px);

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 0.2rem solid var(--button-idle-color);
        border-color: var(--button-idle-color) transparent var(--button-idle-color) transparent;
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
