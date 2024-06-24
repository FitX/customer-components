import { computed, type Ref, ref, toValue, useSlots } from 'vue';
import type { Theme } from '@/types';
import { useFocusWithin } from '@vueuse/core';
import { getModifierClasses } from '@/utils/css-modifier';

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
    'input',
    ...getModifierClasses('input', toValue(isFilled) ? 'is-filled' : []),
    ...getModifierClasses('input', toValue(isActive) ? 'is-active' : []),
    ...getModifierClasses('input', toValue(isDisabled) ? 'disabled' : []),
    ...getModifierClasses('input', toValue(hasIconStart) ? 'has-icon-start' : []),
    ...getModifierClasses('input', toValue(hasIconEnd) ? 'has-icon-end' : []),
    ...getModifierClasses('input', props.errorMessage ? 'has-error' : []),
    ...getModifierClasses('input', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
    ...getModifierClasses('input', toValue(modelValue) ? 'is-filled' : []),
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
