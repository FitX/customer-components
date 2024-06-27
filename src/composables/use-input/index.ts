import { computed, type Ref, ref, toValue, useSlots } from 'vue';
import type { Theme } from '@/types';
import { useFocusWithin } from '@vueuse/core';
import { getModifierClasses } from '@/utils/css-modifier';

export type SharedInputInternalType = 'input' | 'textarea';
export type SharedInputModifier = 'disabled';
export type SharedInputProps = {
  theme?: Theme;
  label: string;
  id?: string;
  /**
   * Native disabled Attribute
   */
  disabled?: boolean;
  errorMessage?: string;
  /**
   * Currently only disabled.
   * Same as disabled attribute, but with focus state
   */
  modifier?: SharedInputModifier;
  /**
   * ## Dev Mode Only
   * Just for presentation in Storybook
   * don't use this in Production
   */
  fakeModifier?: 'none' | 'hover' | 'focus'; // Dev Mode only @TODO remove from export on build
};
export const useInput = <ModelValue = string>(
  props: SharedInputProps,
  modelValue: Ref<ModelValue>,
  type: SharedInputInternalType = 'input',
) => {
  const slots = useSlots();

  const wrapperEl = ref();
  const { focused } = useFocusWithin(wrapperEl);

  const isDisabled = computed<boolean>(() => props.disabled || props.modifier === 'disabled');
  const isFilled = computed(() => `${modelValue.value}`.length > 0);
  const isActive = computed(() => toValue(focused));
  const hasIconStart = computed(() => !!slots['icon-start']);
  const hasIconEnd = computed(() => !!slots['icon-end']);

  const componentClasses = computed(() => [
    type,
    ...getModifierClasses(type, toValue(isFilled) ? 'is-filled' : []),
    ...getModifierClasses(type, toValue(isActive) ? 'is-active' : []),
    ...getModifierClasses(type, toValue(isDisabled) ? 'disabled' : []),
    ...getModifierClasses(type, toValue(hasIconStart) ? 'has-icon-start' : []),
    ...getModifierClasses(type, toValue(hasIconEnd) ? 'has-icon-end' : []),
    ...getModifierClasses(type, props.errorMessage ? 'has-error' : []),
    ...getModifierClasses(type, props.fakeModifier ? `fake-${props.fakeModifier}` : []),
    ...getModifierClasses(type, toValue(modelValue) ? 'is-filled' : []),
  ]);

  return {
    slots,
    modelValue,
    wrapperEl,
    focused,
    isDisabled,
    isFilled,
    isActive,
    hasIconStart,
    hasIconEnd,
    componentClasses,
  };
};
