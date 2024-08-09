<script lang="ts" setup>
import { computed, toValue, useSlots } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';
import type { FitxTextButtonProps } from '@/components/fitx-text-button/types';

const props = withDefaults(defineProps<FitxTextButtonProps>(), {
  tag: 'button',
});

const slots = useSlots();
const hasIcons = computed(() => !!slots['icon-start'] || !!slots['icon-end']);

const componentClasses = computed(() => [
  ...getModifierClasses('text-button', props.modifier ?? []),
  ...getModifierClasses('text-button', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('text-button', toValue(hasIcons) ? 'has-icon' : []),
]);
</script>
<template>
  <component
    :is="props.tag"
    :data-theme="props.theme"
    class="text-button"
    :class="componentClasses">
    <span class="text-button__inner">
      <!--
      @slot optional Icon Slot
      -->
      <slot name="icon-start">
        <span />
      </slot>
      <slot name="default"> </slot>
      <slot name="icon-end"> </slot>
    </span>
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as normalize;

.text-button {
  @include normalize.btn();

  $self: &;
  --_text-button-spacing-inline: var(--text-button-spacing-inline, var(--size-px-4));
  --_text-button-spacing-block: var(--text-button-spacing-block, var(--size-px-3));
  --_text-button-radius: var(--text-button-radius, var(--radius-9));
  --_text-button-border-width: var(--text-button-border-width, 2px);
  --_text-button-font-size: var(--text-button-font-size, 1.125rem);
  --_text-button-font-weight: var(--text-button-font-weight, 500);
  --_text-button-icon-size: var(--text-button-icon-size, var(--size-px-5));
  --_text-button-content-gap: var(--text-button-content-gap, var(--size-px-2));
  // primary Styles
  --_text-button-color-surface: var(--text-button-color-primary-surface-light, transparent);
  --_text-button-color-border: var(--text-button-color-primary-border-light, transparent);
  --_text-button-color-surface-hover: var(
    --text-button-color-primary-surface-hover-light,
    var(--brand-color-gray-chalk)
  );
  --_text-button-color-text: var(
    --text-button-color-primary-text-light,
    var(--brand-color-orange-0)
  );
  // disabled
  --_text-button-color-surface-disabled: var(
    --text-button-color-primary-surface-disabled-light,
    transparent
  );
  --_text-button-color-border-disabled: var(
    --text-button-color-primary-border-disabled-light,
    transparent
  );
  --_text-button-color-text-disabled: var(
    --text-button-color-primary-text-disabled-light,
    var(--brand-color-gray-cement)
  );

  &:is([data-theme='dark']) {
    --_text-button-color-surface-hover: var(
      --text-button-color-primary-surface-hover-dark,
      var(--brand-color-anthracite-3)
    );
    --_text-button-color-text-disabled: var(
      --text-button-color-primary-text-disabled-dark,
      var(--brand-color-gray-cement)
    );
  }

  &--secondary {
    --_text-button-font-weight: var(--text-button-secondary-font-weight, 400);
  }

  // display: inline-block;
  display: inline-grid;
  align-items: center;

  background: var(--_text-button-color-surface);
  color: var(--_text-button-color-text);
  font-size: var(--_text-button-font-size);
  font-weight: var(--_text-button-font-weight);
  border: var(--_text-button-border-width) solid var(--_text-button-color-border);
  border-radius: var(--_text-button-radius);
  padding-block: var(--_text-button-spacing-block);
  padding-inline: var(--_text-button-spacing-inline);

  &__inner {
    --icon-fill: currentColor;

    display: inline-grid;
    grid-template-columns: repeat(3, auto);
    gap: var(--_text-button-content-gap);
    align-items: center;
    line-height: 1;
  }

  &:is(:hover, :active, :focus, #{$self}--fake-hover) {
    --_text-button-color-surface: var(--_text-button-color-surface-hover);
  }

  &:is(:disabled, #{$self}--disabled) {
    --_text-button-color-surface: var(--_text-button-color-surface-disabled);
    --_text-button-color-text: var(--_text-button-color-text-disabled);
    --_text-button-color-border: var(--_text-button-color-border-disabled);
  }
}
</style>
