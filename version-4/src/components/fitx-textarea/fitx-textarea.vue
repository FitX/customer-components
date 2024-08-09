<script lang="ts" setup>
import { FitxLabel, FitxErrorMessage } from '@/components';
import type { TextareaProps } from './types';
import { useInput } from '@/composables/use-input';
import { computed } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';

const props = withDefaults(defineProps<TextareaProps>(), {
  id: () => crypto.randomUUID(),
  errorMessageMaxLength: 'Die maximale Anzahl an Zeichen ist erreicht.',
  fieldSizing: true,
});

defineSlots<{
  /**
   * additional count slot
   */
  count?: () => any;
}>();

const modelValue = defineModel<string>({ default: '' });

const { wrapperEl, isDisabled, componentClasses } = useInput<string>(props, modelValue, 'textarea');

const currentLength = computed(() => modelValue.value.length || 0);
const errorMessage = computed(() => {
  if (props.maxLength && props.maxLength < currentLength.value) {
    return props.errorMessageMaxLength;
  }
  return props.errorMessage;
});
</script>

<template>
  <div
    ref="wrapperEl"
    :data-theme="props.theme"
    :class="[
      ...componentClasses,
      ...getModifierClasses('textarea', errorMessage ? 'has-error' : []),
      ...getModifierClasses('textarea', props.fieldSizing ? 'auto-height' : []),
    ]">
    <div
      :data-replicated-value="modelValue"
      class="textarea__ui">
      <fitx-label
        class="textarea__label"
        :text="props.label"
        :for="props.id" />
      <textarea
        class="textarea__input"
        placeholder=""
        v-model="modelValue"
        :readonly="isDisabled || !!$attrs.readonly"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
        :rows="props.rows"
        :id="props.id" />
    </div>
    <div
      data-v-if="errorMessage || $slots.count || props.maxLength"
      class="additional">
      <span>
        <fitx-error-message
          v-if="errorMessage"
          class="additional__error"
          :text="errorMessage" />
      </span>
      <span class="additional__text">
        <slot
          name="count"
          v-bind="{ currentLength }">
          <span v-if="props.maxLength"> {{ currentLength }} / {{ props.maxLength }} Zeichen </span>
        </slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/shared-input.scss' as shared-input;
.textarea {
  $self: &;
  @include shared-input.use-input('textarea');

  --_input-inline-size: var(--textarea-inline-size, 100%);
  --_input-block-size: var(--textarea-block-size, 6.25rem);

  // block-size: auto;
  // min-block-size: var(--_input-block-size);
  inline-size: var(--_input-inline-size);

  &__label {
    align-content: start;
  }

  &__input {
    resize: none;
    #{$self}--auto-height & {
      overflow: hidden;
      @supports (field-sizing: content) {
        field-sizing: content;
      }
    }
  }

  &__ui {
    align-content: start;
    block-size: auto;
    min-block-size: var(--_input-block-size);
    #{$self}--auto-height &::after {
      /**
      Fallback Styles for auto resize
       */
      @supports not (field-sizing: content) {
        // same shared styles as native input/textarea
        @include shared-input.input-element-styles(&);

        /* Note the weird space! Needed to prevent jumpy behavior */
        content: attr(data-replicated-value) ' ';
        /* This is how textarea text behaves */
        white-space: pre-wrap;
        /* Hidden from view, clicks, and screen readers */
        visibility: hidden;
      }
    }
  }
}

.additional {
  --_additional-font-size: var(--additional-font-size, 0.875rem);
  --_additional-color: var(--additional-color-light, var(--brand-color-gray-carbon));

  &:is([data-theme='dark']) {
    --_additional-color: var(--additional-color-dark, var(--brand-color-gray-graphite));
  }

  font-size: var(--_additional-font-size);
  color: var(--_additional-color);
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  align-items: center;
  &__text {
    justify-self: end;
  }
}
</style>
