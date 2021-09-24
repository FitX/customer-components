<template>
  <label
    class="chip"
    :class="[
      getModifierClasses('chip', [
        isChecked ? 'checked' : null,
        isDarkMode ? 'dark' : null,
      ]),
      getModifierClasses('chip', modifier),
    ]">
    <input
      class="chip__input"
      v-model="computedValue"
      type="checkbox"
      v-bind="$attrs"
      :value="value"
    />
    <span class="chip__content">
      <span class="chip__label">{{ label }}</span>
      <span class="chip__count">{{ count }}</span>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';

/**
 * @typedef {null|Array<string | number>} FilterChipModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
];

export default {
  name: 'FilterChip',
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
        Array,
      ],
      default: null,
    },
    /**
     * Value {FilterChipModelValue}
     */
    value: {
      type: [String, Number],
      default: null,
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
    label: {
      type: [String, Number],
      default: null,
    },
    /**
     * Optional Count Value
     */
    count: {
      type: [String, Number],
      default: null,
    },
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {FilterChipModelValue} val - Checkbox Value
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
       * @param {FilterChipModelValue} value
       */
      set(value) {
        emit('update:modelValue', value);
      },
    });
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      return false;
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
@import '~@/assets/styles/form.scss';
.chip {
  $self: &;
  --chip-color-bg: var(--brand-color-gray-smoke);
  --chip-color: var(--brand-color-anthracite);
  --chip-color-count: var(--brand-color-gray-cement);
  --chip-height: 3.6rem;
  --chip-border-radius: 2.6rem;
  --chip-spacing-v: 0.7rem;
  --chip-spacing-h: 2rem;
  --chip-font-size: 1.6rem;

  background: var(--chip-color-bg);
  color: var(--chip-color);
  padding: var(--chip-spacing-v) var(--chip-spacing-h);
  border-radius: var(--chip-border-radius);
  height: var(--chip-height);
  font-size: var(--chip-font-size);
  display: inline-grid;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
  min-width: max-content;
  user-select: none;

  &--dark {
    --chip-color-bg: var(--brand-color-anthracite-3);
    --chip-color: #fff;
  }

  &__input {
    display: none;
  }

  &__content {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1.4rem;
  }

  &__count {
    color: var(--chip-color-count);
  }

  &:hover,
  &--fake-hover {
    &:not(#{$self}--checked) {
      --chip-color-bg: var(--brand-color-gray-ash);

      &#{$self}--dark {
        --chip-color-bg: var(--brand-color-gray-carbon);
      }
    }
  }

  &--checked {
    --chip-color-bg: var(--brand-color-anthracite);
    --chip-color: #fff;
    &#{$self}--dark {
      --chip-color: var(--brand-color-anthracite);
      --chip-color-bg: #fff;
    }
  }
}
</style>
