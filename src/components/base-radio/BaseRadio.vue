<template>
  <label
    class="radio"
    :class="[
      getModifierClasses('radio', [
        isChecked ? 'checked' : null,
        $attrs.disabled ? 'disabled' : null,
        isDarkMode ? 'dark' : null,
      ]),
      getModifierClasses('radio', modifier),
    ]">
    <span class="radio__input-wrapper">
      <input
        class="radio__input"
        v-model="computedValue"
        type="radio"
        v-bind="$attrs"
        :value="value"
      />
      <span
        class="radio__icon" />
    </span>
    <span class="radio__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';

/**
 * @typedef {string|number|null|Array<string | number>} BaseradioModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
  'error',
];

export default {
  name: 'BaseRadio',
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
      ],
      default: null,
    },
    /**
     * Value {BaseRadioModelValue}
     */
    value: {
      type: [String, Number, Array],
      default: null,
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
     * @property {BaseRadioModelValue} val - Radio Value
     */
    'update:modelValue',
  ],
  setup: (props, { emit }) => {
    /**
     * Local Model
     * @type {WritableComputedRef<boolean|string|number|undefined>}
     */
    const computedValue = computed({
      /**
       * Get Model Value
       * @return {string|*}
       */
      get: () => props.modelValue,
      /**
       * Emit local Modal Value
       * @param {BaseRadioModelValue} value
       */
      set(value) {
        emit('update:modelValue', value);
      },
    });
    const isChecked = computed(() => props.modelValue === props.value);
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
.radio {
  $self: &;
  --radio-color: var(--brand-color-anthracite);
  --radio-color-border: var(--brand-color-gray-stone);
  --radio-color-bg: transparent;
  --radio-icon-size: 2.2rem;
  // --radio-size: calc((2 * 0.1rem) + var(--radio-icon-size));
  --radio-size: var(--radio-icon-size);
  --radio-icon-fill: #fff;
  display: inline-grid;
  gap: 1rem;
  grid-template-columns: var(--radio-icon-size) 1fr;
  --radio-color-border-inner-1: transparent;
  --radio-color-border-inner-2: transparent;
  user-select: none;
  cursor: pointer;
  color: var(--radio-color);

  &--dark {
    --radio-color: #fff;
    --radio-color-border: var(--brand-color-gray-graphite);
    &#{$self}--error {
      --radio-icon-fill: #fff;
    }
  }

  &__input-wrapper {
    display: block;
    width: var(--radio-size);
    height: var(--radio-size);
    position: relative;
    line-height: 25px;
  }

  &__input {
    appearance: none;
    border: 1px solid var(--radio-color-border);
    width: var(--radio-size);
    height: var(--radio-size);
    padding: 0;
    margin: 0;
    outline: none;
    border-radius: calc(var(--radio-icon-size) / 2);
    background: var(--radio-color-bg);
    box-shadow:
      0 0 0 1px var(--radio-color-border-inner-1),
      0 0 0 2px var(--radio-color-border-inner-2);

    #{$self}--fake-hover &,
    #{$self}:hover & {
      --radio-color-border: var(--brand-color-gray-graphite);
    }

    #{$self}--fake-focus &,
    #{$self}:focus & {
      --radio-color-border: var(--brand-color-gray-coal);
      --radio-color-border-inner-1: #fff;
      --radio-color-border-inner-2: var(--brand-color-gray-graphite);
    }
    // Overwrite for dark mode
    #{$self}--dark#{$self}--fake-focus &,
    #{$self}--dark #{$self}:focus & {
      --radio-color-border: transparent;
      --radio-color-border-inner-1: var(--brand-color-gray-graphite);
      --radio-color-border-inner-2: #fff;
    }

    #{$self}--disabled &,
    &[disabled] {
      --radio-color-bg: var(--brand-color-gray-chalk);
      --radio-color-border: var(--brand-color-gray-plumb);
      #{$self}--dark & {
        --radio-color-border: var(--brand-color-gray-carbon);
        --radio-color-bg: var(--brand-color-gray-graphite);
      }
    }

    #{$self}--error & {
      --radio-color-bg: var(--functional-color-error);
      --radio-color-border: var(--functional-color-error);
    }
    #{$self}--error#{$self}--dark & {
      --radio-color-bg: var(--functional-color-error-1-dark);
    }

    // Checked Styles on different modifiers
    #{$self}--checked &,
    &:checked {
      --radio-color-border: var(--brand-color-anthracite);
      --radio-color-bg: var(--brand-color-anthracite);
    }
    #{$self}--checked#{$self}--disabled &,
    #{$self}--disabled &:checked {
      --radio-color-border: var(--brand-color-gray-plumb);
      --radio-color-bg: var(--brand-color-gray-plumb);
    }
    #{$self}--checked#{$self}--error &,
    #{$self}--error &:checked {
      --radio-color-bg: var(--functional-color-error);
      --radio-color-border: var(--functional-color-error);
    }
    #{$self}--checked#{$self}--fake-focus &,
    #{$self}--fake-focus &:checked {
      // --radio-color-border: var(--brand-color-gray-coal);
      --radio-color-border-inner-1: #fff;
      --radio-color-border-inner-2: var(--brand-color-anthracite);
    }
    // Overwrite for Dark Mode
    #{$self}--dark:not(#{$self}--error) &:checked {
      --radio-color-bg: #fff;
      --radio-color-border: #fff;
      & + #{$self}__icon {
        --radio-icon-fill: var(--brand-color-anthracite);
      }
    }
    #{$self}--dark#{$self}--checked#{$self}--disabled &,
    #{$self}--dark#{$self}--disabled &:checked {
      --radio-color-border: var(--brand-color-gray-plumb);
      --radio-color-bg: var(--brand-color-gray-plumb);
    }
    #{$self}--dark#{$self}--fake-focus &:checked {
      // --radio-color-border: var(--brand-color-gray-coal);
      --radio-color-bg: #fff;
      --radio-color-border-inner-1: var(--brand-color-anthracite);
      --radio-color-border-inner-2: #fff;
      & + #{$self}__icon {
        --radio-icon-fill: var(--brand-color-anthracite);
      }
    }
  }

  &__icon {
    opacity: 0;
    background: var(--radio-icon-fill);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 0.8rem;
    height: 0.8rem;
    border-radius: calc(0.8rem / 2);
    #{$self}--checked &,
    #{$self}__input:checked + & {
      opacity: 1;
    }
    #{$self}--fake-focus:not(#{$self}--checked) #{$self}__input:not(:checked) + &,
    #{$self}__input:focus:not(:checked) + & {
      --radio-icon-fill: var(--brand-color-gray-graphite);
    }
    #{$self}--dark#{$self}--disabled:not(#{$self}--error) &,
    #{$self}--dark:not(#{$self}--error) #{$self}__input[disabled] + & {
      --radio-icon-fill: var(--brand-color-gray-cement);
    }
  }

  &__text {
    font-size: 1.6rem;
  }
}
</style>
