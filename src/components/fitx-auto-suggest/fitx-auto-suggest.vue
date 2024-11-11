
<script lang="ts" setup>
import { GymxAutoSuggest } from '@fitx/gymx-ui';
import type {
  FitxAutoSuggestProps,
} from './types';

const props = defineProps<FitxAutoSuggestProps>()
</script>
<template>
  <gymx-auto-suggest class="auto-suggest" v-bind="props" />
</template>

<style lang="scss">
// @import '@/assets/styles/shared/text-field.scss';
@use '@/assets/styles/shared/text-field.scss' as text-field;

.auto-suggest {
  @include text-field.text-field-custom-properties();

  --auto-suggest-border-radius: var(--fitx-radius-5);
  --auto-suggest-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.10);

  --auto-suggest-list-block-size: 300px;
  --auto-suggest-list-inline-size: 100%;
  --auto-suggest-list-color-background: var(--brand-color-white-0);
  --auto-suggest-list-border: 1px solid var(--brand-color-gray-ash);

  --auto-suggest-item-text-font-size: var(--font-size-2);
  // --input-padding-inline: var(--fitx-size-small);
  // --input-padding-block: var(--fitx-size-tiny);
  --auto-suggest-item-inline-padding: var(--input-padding-inline);
  --auto-suggest-item-block-padding: var(--auto-suggest-item-inline-padding);
  --auto-suggest-item-color: inherit;
  --auto-suggest-item-color-background: none;
  --auto-suggest-item-color-focus: inherit;

  --auto-suggest-item-color-hover: inherit;
  --auto-suggest-item-color-background-hover: inherit;

  --auto-suggest-item-color-selected: inherit;
  --auto-suggest-item-color-background-selected: inherit;

  &__list {
    box-shadow: var(--auto-suggest-shadow);
    overflow-y: auto;
  }

  &__option {
    background: red;
  }
}
</style>

