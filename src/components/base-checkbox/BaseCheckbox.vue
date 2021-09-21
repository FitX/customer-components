<template>
  <label
    class="checkbox"
    :class="[
      getModifierClasses('checkbox', [
        // checked ? 'checked' : null,
        $attrs.disabled ? 'disabled' : null,
      ]),
      getModifierClasses('checkbox', modifier),
    ]">
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
      {{ isChecked }}
    </span>
  </label>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';
import iconCheckmark from '@/assets/icons/icon-checkmark.svg';
// import iconCheckmark from '!!vue-svg-loader!../../assets/icons/icon-checkmark.svg';

/**
 * @typedef {string|number|null|Array<string | number>} BaseCheckboxModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
  'error',
];

export default {
  name: 'BaseCheckbox',
  components: {
    iconCheckmark,
  },
  inheritAttrs: false,
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
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
    /* checked: {
      type: Boolean,
      default: false,
    }, */
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
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return props.modelValue === props.trueValue;
    });
    const { getModifierClasses } = useModifier();
    return {
      computedValue,
      getModifierClasses,
      isChecked,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  $self: &;
  --checkbox-color-border: var(--brand-color-gray-stone);
  --checkbox-color-bg: transparent;
  --checkbox-icon-size: 2.3rem;
  // --checkbox-size: calc((2 * 0.1rem) + var(--checkbox-icon-size));
  --checkbox-size: var(--checkbox-icon-size);
  --checkbox-icon-fill: #fff;
  display: inline-grid;
  gap: 1rem;
  grid-template-columns: var(--checkbox-icon-size) 1fr;
  --checkbox-color-border-inner-1: transparent;
  --checkbox-color-border-inner-2: transparent;
  user-select: none;
  cursor: pointer;

  &__input-wrapper {
    display: block;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    position: relative;
    line-height: 25px;
  }

  &__input {
    appearance: none;
    border: 1px solid var(--checkbox-color-border);
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    padding: 0;
    margin: 0;
    outline: none;
    border-radius: 0.4rem;
    background: var(--checkbox-color-bg);
    /* box-shadow:
      0 0 0 1px var(--checkbox-color-border-inner-1) inset,
      0 0 0 2px var(--checkbox-color-border-inner-2) inset; */
    box-shadow:
      0 0 0 1px var(--checkbox-color-border-inner-1),
      0 0 0 2px var(--checkbox-color-border-inner-2);

    #{$self}--fake-hover &,
    #{$self}:hover & {
      --checkbox-color-border: var(--brand-color-gray-graphite);
    }

    #{$self}--fake-focus &,
    #{$self}:focus & {
      --checkbox-color-border: var(--brand-color-gray-coal);
      --checkbox-color-border-inner-1: #fff;
      --checkbox-color-border-inner-2: var(--brand-color-gray-graphite);
      /* box-shadow:
        0 0 0 1px #fff inset,
        0 0 0 2px var(--brand-color-gray-graphite) inset; */
    }

    #{$self}--disabled &,
    &[disabled] {
      --checkbox-color-bg: var(--brand-color-gray-chalk);
      --checkbox-color-border: var(--brand-color-gray-plumb);
    }

    #{$self}--error & {
      --checkbox-color-bg: var(--functional-color-error);
      --checkbox-color-border: var(--functional-color-error);
    }

    // Checked Styles on different modifiers
    #{$self}--checked &,
    &:checked {
      --checkbox-color-border: var(--brand-color-anthracite);
      --checkbox-color-bg: var(--brand-color-anthracite);
    }
    #{$self}--checked#{$self}--disabled &,
    #{$self}--disabled &:checked {
      --checkbox-color-border: var(--brand-color-gray-plumb);
      --checkbox-color-bg: var(--brand-color-gray-plumb);
    }
    #{$self}--checked#{$self}--error &,
    #{$self}--error &:checked {
      --checkbox-color-bg: var(--functional-color-error);
      --checkbox-color-border: var(--functional-color-error);
    }
    #{$self}--checked#{$self}--fake-focus &,
    #{$self}--focus &:checked {
      // --checkbox-color-border: var(--brand-color-gray-coal);
      --checkbox-color-border-inner-1: #fff;
      --checkbox-color-border-inner-2: var(--brand-color-anthracite);
    }
  }

  &__icon {
    opacity: 0;
    --icon-fill: var(--checkbox-icon-fill);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    #{$self}--checked &,
    #{$self}__input:checked + &,
    #{$self}--fake-focus &,
    #{$self}__input:focus + & {
      opacity: 1;
    }
    #{$self}--fake-focus:not(#{$self}--checked) #{$self}__input:not(:checked) + &,
    #{$self}__input:focus:not(:checked) + & {
      --checkbox-icon-fill: var(--brand-color-gray-graphite);
    }
  }

  &__text {
    font-size: 1.6rem;
  }
}
</style>
