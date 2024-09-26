
<script lang="ts" setup>
import { GymxTextField } from '@fitx/gymx-ui';
import { FitxErrorMessage, IconCheckmark } from '@';
import type { FitxTextFieldProps, FitxTextFieldSlots } from '@/components/fitx-text-field/types';
import { computed, toValue } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';

const slots = defineSlots<FitxTextFieldSlots>();
const props = defineProps<FitxTextFieldProps>();

const modelValue = defineModel<string | number>({ default: '' });
const isFilled = computed(() => `${modelValue.value}`?.length > 0);

const componentRootClass = 'text-field';
const componentClasses = computed(() => ([
  componentRootClass,
  getModifierClasses(componentRootClass, toValue(isFilled) ? 'is-filled' : undefined),
  getModifierClasses(componentRootClass, props.isValid ? 'is-valid' : undefined),
  getModifierClasses(componentRootClass, props.errorMessage ? 'has-error' : undefined),
]))
</script>
<template>
  <gymx-text-field
    v-bind="props"
    v-model="modelValue"
    data-input-attributes="{ state: 'focused' }"
    :class="componentClasses">
    <template v-for="(_slotFn, slotName) in slots" v-slot:[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
    <!--<template #input-start>
      <slot name="input-start"></slot>
    </template>
    <template #input-end>
      <slot name="input-end"></slot>
    </template>
    <template #input-hint>
      <slot name="input-hint"></slot>
    </template> -->
    <template #input-error-message>
      <fitx-error-message :text="props.errorMessage" v-if="errorMessage" />
    </template>
    <template #input-end>
      <slot name="input-end">
        <IconCheckmark class="icon-valid" v-if="props.isValid" />
      </slot>
    </template>
</gymx-text-field>
</template>
<style lang="scss" scoped>
@use "@/assets/styles/shared/label" as sharedLabel;

.text-field {
  $self: &;
  @include sharedLabel.label-styles();
}

.text-field {
  $self: &;
  --input-font-family: inherit;
  --input-font-size: 20px; //var(--font-size-1);

  /* UI States */
  --input-color: var(--fitx-input-color, var(--brand-color-gray-carbon));
  --input-color-background: var(--fitx-input-color-background, transparent);
  --input-color-border: var(--fitx-input-color-border, var(--brand-color-gray-stone));

  /* --input-color-hover: red;
  --input-color-background-hover: red; */
  --input-color-hover: var(--fitx-input-color);
  --input-color-border-hover: var(--fitx-input-color-border-hover, var(--brand-color-gray-graphite));

  --input-color-disabled: var(--fitx-input-color-disabled, var(--brand-color-gray-cement));
  --input-color-background-disabled: var(--fitx-input-color-background-disabled, var(--brand-color-gray-chalk));
  --input-color-border-disabled: var(--fitx-input-color-border-disabled, var(--brand-color-gray-stone));

  --input-color-border-focused: var(--fitx-input-color-border-focused, var(--brand-color-anthracite-0));

  --input-color-border-error: var(--fitx-input-color-border-error, var(--functional-color-error-0));
  --input-color-error: var(--fitx-input-color-error, inherit);
  --label-color-error: var(--fitx-label-color-error, var(--functional-color-error-0));
  --input-color-background-error: var(--fitx-input-color-background-error, var(--functional-color-error-1-light));

  --icon-fill: var(--label-color);

  /* Other */
  --input-radius: var(--fitx-radius-4);
  --input-padding-inline: var(--fitx-size-small);
  --input-padding-block: var(--fitx-size-tiny);
  --input-gap: 10px;
  --input-border: 1px solid var(--input-color-border);
  --text-field-gap: var(--fitx-size-tiny);

  /* FitX Custom */
  --input-height: 60px;

  /* Label */
  --label-font-size: var(--input-font-size);
  --label-position-block-start: calc(var(--input-height) / 2);

  --icon-width: 24px;
  --icon-height: 24px;


  position: relative;

  /* &:has(.input--disabled) {
    --label-color: var(--brand-color-gray-graphite);
    --input-color-hover: var(--input-color-disabled);
    --input-color-background-hover: var(--input-color-background-disabled);
    --input-color-border-hover: var(--input-color-border-disabled);
    --input-color-border: var(--input-color-border-disabled);
  } */

  &--has-error {
    --input-color: var(--input-color-error);
    --input-color-border: var(--input-color-border-error);
    --label-color: var(--label-color-error);
    --input-color-background: var(--input-color-background-error);

    --input-color-border-hover: var(--input-color-border-error);
    --label-color-hover: var(--label-color-error);
    --input-color-background-hover: var(--input-color-background-error);
  }

  &:has(.input__start:not(:empty)) :deep(label) {
    margin-inline-start: calc(var(--icon-width) + var(--input-gap));
    background: red;

    /* &::before {
      content: "";
      position: absolute;
      top: -20px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: red;
    } */
  }

  &:deep(input) {
    padding-inline: 0;
    padding-block: 0;
    border: 0;
  }

  :deep(#{$self}__input) {
    align-content: center;
    align-items: center;
    height: var(--input-height);
    outline: none;
  }

  :deep(#{$self}__additional) {
    font-size: var(--font-size-0);
    color: var(--brand-color-gray-carbon);
  }


  &--is-filled, &:focus-within {
    --label-font-size: 0.875rem;
    --label-position-block-start: calc(var(--input-padding-inline) + 2px);

    :deep(#{$self}__input) {
      padding-block-start: calc(var(--input-padding-block) + var(--label-font-size));
      // padding-block-end: calc(var(--input-padding-block) - var(--label-font-size));
    }

    :deep(.input__start),
    :deep(.input__end) {
      translate: 0 calc((var(--input-padding-block)) * -1);
    }
  }

  :deep(.input__start),
  :deep(.input__end) {
    display: flex;
  }

  &:focus-within, &:has(.input--focused) {
    --input-color-border: var(--input-color-border-focused);
  }

  :deep(#{$self}__label) {
    transition:
      font-size 60ms ease,
      top 60ms ease;
    position: absolute;
    top: var(--label-position-block-start);
    translate: var(--input-padding-inline) -50%;
    line-height: var(--label-font-size);
  }

  /*
  --_input-border: var(--input-border, var(--gymx-border-size-1) solid var(--_input-color-border));
  --_input-outline: var(--input-outline, var(--_input-border));
   */
}

.icon-valid {
  --icon-fill: var(--functional-color-success-0);
}
</style>
