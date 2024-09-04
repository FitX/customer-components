
<script lang="ts" setup>
import { GymxButton } from '@fitx/gymx-ui';

import type { FitxButtonProps, FitxButtonSlots } from './types';
import { getModifierClasses } from '@/utils/css-modifier';
defineSlots<FitxButtonSlots>();

const props = defineProps<FitxButtonProps>();
</script>
<template>
  <gymx-button
    class="btn"
    :class="[
      getModifierClasses('btn', [props.size, props.modifier]),
    ]"
    :state="props.state">
    <template #icon-start>
      <slot name="icon-start"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #icon-end>
      <slot name="icon-end"></slot>
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

  --_button-border-width: 2px;
  --_button-border-color: var(--button-color-background);

  --button-border: var(--_button-border-width) solid var(--_button-border-color);
  --button-font-size: inherit;
  --button-font-family: var(--font-stack-normal);

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

    &:is(:hover, #{$self}--hover, :focus-visible) {
      --button-color-background: var(--brand-color-gray-chalk);
    }

    &:is(:disabled, #{$self}--disabled) {
      --button-color: var(--brand-color-gray-cement);
      --button-color-background: var(--brand-color-white-0);
    }
  }

  // --button-color-background-hover: var(--brand-color-orange-1);
}
</style>
