
<script lang="ts" setup>
import { GymxAutoSuggest } from '@fitx/gymx-ui';
import type {
  FitxAutoSuggestProps,
} from './types';
import { IconClearFilled } from '@/components';
import { computed, ref, getCurrentInstance } from 'vue';

const props = withDefaults(defineProps<FitxAutoSuggestProps>(), {
  noResultsText: 'Keine Ergebnisse gefunden.',
  resetText: 'Suche zurücksetzten',
});
const component = ref();

const isFilled = computed(() => component.value?.inputValue?.length > 0);
// const noResultsDynamicText = computed(() => isFilled.value ? props.noResultsText : '...');
const reset = () => {
  component.value.inputValue = '';
  component.value.inputElement.focus();
};
</script>
<template>
  <gymx-auto-suggest
    class="auto-suggest"
    v-bind="props"
    ref="component"
    :class="[{ 'is-filled' : isFilled }]">
    <template #input-end>
      <button
        v-if="isFilled"
        class="reset-button"
        @click="reset()"><icon-clear-filled aria-hidden="true" /><span class="sr-only">{{ props.resetText}}</span></button>
    </template>
  </gymx-auto-suggest>
</template>

<style lang="scss">
// @import '@/assets/styles/shared/text-field.scss';
@use '@/assets/styles/shared/text-field.scss' as text-field;

.auto-suggest {
  @include text-field.text-field-custom-properties();

  --auto-suggest-border-radius: var(--fitx-radius-5);
  --auto-suggest-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.10);

  --auto-suggest-list-block-size: auto;
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
    max-height: var(--auto-suggest-list-max-block-size, 300px);
  }

  &__option {
    background: red;
  }

  ::-webkit-search-cancel-button {
    display: none;
  }
}

.reset-button {
  --icon-width: 18px;
  --icon-height: 18px;
  background: none;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  line-height: 0;
  display: inline-flex;
}
</style>

