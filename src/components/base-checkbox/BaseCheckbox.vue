<template>
  <label
    :class="[
      getModifierClasses('checkbox', modifier),
    ]"
    class="checkbox">
    <span class="checkbox__input-wrapper">
      <input
        class="checkbox__input"
        v-model="computedValue"
        type="checkbox"
        v-bind="$attrs"
        :true-value="trueValue"
        :false-value="falseValue"
        :value="value"
        :checked="checked"
      />
      <icon-checkmark class="checkbox__icon" />
    </span>
    <span class="checkbox__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';
import iconCheckmark from '../../assets/icons/icon-checkmark.svg';
// import iconCheckmark from '!!vue-svg-loader!../../assets/icons/icon-checkmark.svg';

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
  components: {
    iconCheckmark,
  },
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
    /**
     * Optional Label for Slot
     */
    label: {
      type: [String, Number],
      default: null,
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
    const { getModifierClasses } = useModifier();
    return {
      computedValue,
      getModifierClasses,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  $self: &;
  --checkbox-color-border: var(--brand-color-gray-stone);
  --checkbox-color-bg: transparent;
  display: inline-grid;
  grid-template-columns: auto 1fr;

  &__input {
    appearance: none;
    border: 1px solid var(--checkbox-color-border);
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 0.4rem;

    #{$self}--fake-hover &,
    #{$self}:hover & {
      --checkbox-color-border: var(--brand-color-gray-graphite);
    }

    #{$self}--disabled &,
    &[disabled] {
      --checkbox-color-bg: var(--brand-color-gray-chalk);
      --checkbox-color-border: var(--brand-color-gray-plumb);
    }
  }
}
</style>
