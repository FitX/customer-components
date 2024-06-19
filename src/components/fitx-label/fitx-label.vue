<script lang="ts" setup>
import { computed } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';
import type { Theme } from '@/types';

export type LabelModifier = 'disabled';
export type FitxInputProps = {
  text: string;
  for?: string;
  modifier?: LabelModifier,
  theme?: Theme;
  error?: boolean;
};

const props = withDefaults(defineProps<FitxInputProps>(), {
  for: () => crypto.randomUUID(),
});

const componentClasses = computed(() => [
  ...getModifierClasses('label', props.error ? 'has-error' : []),
  ...getModifierClasses('label', props.modifier ?? []),
]);
</script>
<template>
  <label
    :data-theme="props.theme"
    class="label"
    :class="componentClasses"
    :for="props.for">
    {{ props.text }}
  </label>
</template>

<style lang="scss" scoped>
.label {
  --_label-font-size: var(--label-font-size, 1.125rem);
  --_label-color-text: var(--label-color-text-light, var(--brand-color-gray-carbon));
  // --_label-color-text-hover: var(--label-color-text-hover, var(--foo));
  // --_label-color-text-focused: var(--label-color-text-focused, var(--foo));
  --_label-color-text-disabled: var(--label-color-text-disabled, var(--brand-color-gray-cement));
  --_label-color-text-error: var(--label-color-text-error, var(--functional-color-error-0));

  font-size: var(--_label-font-size);
  font-weight: 400;
  color: var(--_label-color-text);

  &--has-error {
    --_label-color-text: var(--_label-color-text-error);
  }

  &--disabled {
    --_label-color-text: var(--_label-color-text-disabled);
  }

  &:is([data-theme='dark']) {
    --_label-color-text: var(--label-color-text-dark, var(--brand-color-gray-graphite));
  }
}
</style>
