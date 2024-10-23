
<script lang="ts" setup>
import { GymxSelectField } from '@fitx/gymx-ui';
import type {
  FitxSelectFieldProps,
  FitxSelectFieldSlots,
} from '@/components/fitx-select-field/types';
import { FitxErrorMessage } from '@/components';
import { getModifierClasses } from '@/utils/css-modifier';
import { computed, ref, toValue } from 'vue';

const slots = defineSlots<FitxSelectFieldSlots>();
const props = defineProps<FitxSelectFieldProps>();

const field = ref();

const modelValue = defineModel<string | number>({ default: '' });
const isFilled = computed(() => modelValue.value);

const componentRootClass = 'select-field';
const componentClasses = computed(() => ([
  componentRootClass,
  getModifierClasses(componentRootClass, toValue(isFilled) ? 'is-filled' : undefined),
  getModifierClasses(componentRootClass, props.isValid ? 'is-valid' : undefined),
  getModifierClasses(componentRootClass, props.errorMessage ? 'has-error' : undefined),
]));

const focusInput = (event: PointerEvent) => {
  if (event?.target instanceof HTMLElement && event?.target?.classList?.contains('select')) {
    event?.target?.querySelector('select')?.focus()
  }
};
</script>
<template>
  <gymx-select-field
    @click="focusInput"
    ref="field"
    :class="componentClasses"
    class="select-field" v-bind="props">
    <template #input-hint>
      <slot name="input-hint"></slot>
    </template>
    <template #input-error-message>
      <fitx-error-message :text="props.errorMessage" v-if="errorMessage" />
    </template>
  </gymx-select-field>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/shared/label" as sharedLabel;
.select-field {
  $self: &;
  @include sharedLabel.label-styles();
}


.select-field {
  $self: &;
  --select-font-family: inherit;
  --select-font-size: 20px; //var(--font-size-1);

  /* UI States */
  --select-color: var(--fitx-input-color, var(--brand-color-gray-carbon));
  --select-color-background: var(--fitx-input-color-background, transparent);
  --select-color-border: var(--fitx-input-color-border, var(--brand-color-gray-stone));

  /* --select-color-hover: red;
  --select-color-background-hover: red; */
  --select-color-hover: var(--fitx-input-color);
  --select-color-border-hover: var(--fitx-input-color-border-hover, var(--brand-color-gray-graphite));

  --select-color-disabled: var(--fitx-input-color-disabled, var(--brand-color-gray-cement));
  --select-color-background-disabled: var(--fitx-input-color-background-disabled, var(--brand-color-gray-chalk));
  --select-color-border-disabled: var(--fitx-input-color-border-disabled, var(--brand-color-gray-stone));

  --select-color-border-focused: var(--fitx-input-color-border-focused, var(--brand-color-anthracite-0));

  --select-color-border-error: var(--fitx-input-color-border-error, var(--functional-color-error-0));
  --select-color-error: var(--fitx-input-color-error, inherit);
  --label-color-error: var(--fitx-label-color-error, var(--functional-color-error-0));
  --select-color-background-error: var(--fitx-input-color-background-error, var(--functional-color-error-1-light));

  --icon-fill: var(--label-color);

  /* Other */
  --select-radius: var(--fitx-radius-4);
  --select-padding-inline: var(--fitx-size-small);
  --select-padding-block: var(--fitx-size-tiny);
  --select-gap: 10px;
  --select-border: 1px solid var(--select-color-border);
  --text-field-gap: var(--fitx-size-tiny);

  /* FitX Custom */
  --select-height: 60px;

  /* Label */
  --label-font-size: var(--select-font-size);
  --label-position-block-start: calc(var(--select-height) / 2);

  --icon-width: 24px;
  --icon-height: 24px;


  position: relative;

  /* &:has(.input--disabled) {
    --label-color: var(--brand-color-gray-graphite);
    --select-color-hover: var(--select-color-disabled);
    --select-color-background-hover: var(--select-color-background-disabled);
    --select-color-border-hover: var(--select-color-border-disabled);
    --select-color-border: var(--select-color-border-disabled);
  } */

  &--has-error {
    --select-color: var(--select-color-error);
    --select-color-border: var(--select-color-border-error);
    --label-color: var(--label-color-error);
    --select-color-background: var(--select-color-background-error);

    --select-color-border-hover: var(--select-color-border-error);
    --label-color-hover: var(--label-color-error);
    --select-color-background-hover: var(--select-color-background-error);
  }

  &:deep(select) {
    padding-inline: 0;
    padding-block: 0;
    border: 0;
    border: 1px solid green;
    margin: 0;
    option {
      margin: 0;
    }
  }

  :deep(#{$self}__input) {
    align-content: center;
    align-items: center;
    height: var(--select-height);
    outline: none;
  }

  :deep(#{$self}__additional) {
    font-size: var(--font-size-0);
    color: var(--brand-color-gray-carbon);
  }


  &--is-filled, &:focus-within {
    --label-font-size: 0.875rem;
    --label-position-block-start: calc(var(--select-padding-inline) + 2px);
    --select-color-border: var(--select-color-border-focused);
    background: red !important;

    :deep(#{$self}__input) {
      padding-block-start: calc(var(--select-padding-block) + var(--label-font-size));
    }
  }

  :deep(#{$self}__label) {
    transition:
      font-size 60ms ease,
      top 60ms ease;
    position: absolute;
    top: var(--label-position-block-start);
    translate: var(--select-padding-inline) -50%;
    line-height: var(--label-font-size);
  }

  /*
  --_input-border: var(--select-border, var(--gymx-border-size-1) solid var(--_input-color-border));
  --_input-outline: var(--select-outline, var(--_input-border));
   */
}
</style>
