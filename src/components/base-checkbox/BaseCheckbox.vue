<template>
  <label>
    <input
      v-model="computedValue"
      type="checkbox"
      v-bind="$attrs"
      :value="value"
      :checked="checked"
    />
    <slot></slot>
  </label>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';

/**
 * @typedef {string|number|null|Array<string | number>} BaseCheckboxModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
];

export default {
  name: 'BaseCheckbox',
  inheritAttrs: false,
  props: {
    /**
     * @model
     */
    modelValue: {
      type: [
        Boolean,
        String,
        Number,
        Array,
      ],
      default: null,
    },
    /**
     * Value {BaseCheckboxModelValue}
     */
    value: {
      type: [String, Number, Array],
      default: null,
    },
    /**
     * @see https://v3.vuejs.org/guide/forms.html#checkbox-2
     */
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    /**
     * @see https://v3.vuejs.org/guide/forms.html#checkbox-2
     */
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {BaseCheckboxModelValue} val - Checkbox Value
     */
    'update:modelValue',
  ],
  setup: (props, { emit }) => {
    /**
     * Local Model
     * @type {WritableComputedRef<boolean|string|number|(string|number)[]|undefined>}
     */
    const computedValue = computed({
      /**
       * Get Model Value
       * @return {string|*}
       */
      get: () => props.modelValue,
      /**
       * Emit local Modal Value
       * @param {BaseCheckboxModelValue} value
       */
      set(value) {
        emit('update:modelValue', value);
      },
    });
    return { computedValue };
  },
};
</script>

<style scoped></style>
