<template>
  <label
    v-bind="$attrs"
    class="btn"
    :class="[
      getModifierClasses('btn', [
        isChecked ? 'active' : null,
        isDarkMode ? 'dark' : null,
        $attrs.disabled ? 'disabled' : null,
      ]),
      getModifierClasses('btn', modifier),
    ]">
    <input
      class="btn__input"
      v-model="computedValue"
      :type="isSingle ? 'radio' : 'checkbox'"
      v-bind="$attrs"
      :value="value"
      :true-value="value"
    />
    <!--
      @slot Default Content Slot
    -->
    <slot>
      {{ title }}
    </slot>
  </label>
</template>

<script>
import { computed, unref } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';

/**
 * @typedef {null | boolean | string | number | Array<string | number>} BaseOptionFormModelValue
 */

export const modifier = [
  // 'disabled',
  'fake-focus',
  'fake-hover',
  'disabled',
  'error',
];

export default {
  name: 'BaseOptionForm',
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
        String,
        Number,
        Boolean,
      ],
      default: null,
    },
    /**
     * Value {BaseOptionFormModelValue}
     */
    value: {
      type: [
        String,
        Number,
        Boolean,
      ],
      default: null,
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
    title: {
      type: [String, Number],
      default: null,
    },
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {BaseOptionFormModelValue} val - Checkbox Value
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
       * @return {string|number|*}
       */
      get: () => props.modelValue,
      /**
       * Emit local Modal Value
       * @param {BaseOptionFormModelValue} value
       */
      set(value) {
        emit('update:modelValue', value);
      },
    });
    const isSingle = computed(() => !(props.modelValue instanceof Array));
    const isChecked = computed(() => {
      if (!unref(isSingle)) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.value;
      // return false;
    });
    const { getModifierClasses } = useModifier();
    return {
      computedValue,
      getModifierClasses,
      isChecked,
      isSingle,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.btn {
  // @include btn-reset();

  $self: &;
  --btn-color-bg: #fff;
  --btn-color-border: var(--brand-color-gray-stone);
  --btn-color: var(--brand-color-anthracite);
  --btn-font-size: 1.125rem;
  --btn-padding: 1.125rem;
  --btn-border-width: 1px;

  height: 3.75rem;
  font-size: var(--btn-font-size);
  font-weight: 400;
  background: var(--btn-color-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  border: var(--btn-border-width) solid var(--btn-color-border);
  border-radius: 8px;
  cursor: pointer;
  text-align: center;

  &:hover,
  &--fake-hover {
    --btn-color-bg: var(--brand-color-gray-chalk);
  }

  &--active {
    &,
    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-anthracite-1);
      --btn-color-border: var(--btn-color-bg);
      --btn-color: #fff;
    }
  }

  &:disabled,
  &--disabled {
    &,
    &:hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
      --btn-color-border: var(--brand-color-gray-ash);
      --btn-color: var(--brand-color-gray-cement);
      cursor: not-allowed;
    }
  }

  &--dark {
    --btn-color-bg: transparent;
    --btn-color: #fff;
    --btn-color-border: var(--brand-color-gray-stone);

    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-gray-coal);
    }

    &:disabled,
    &#{$self}--disabled {
      &,
      &:hover {
        --btn-color-bg: transparent;
        --btn-color: var(--brand-color-gray-cement);
        --btn-color-border: var(--brand-color-gray-carbon);
      }
    }
    &#{$self}--active {
      &,
      &:hover,
      &#{$self}--fake-hover {
        --btn-color-bg: #fff;
        --btn-color-border: #fff;
        --btn-color: var(--brand-color-anthracite);
      }
    }
  }

  &--error {
    // @TODO FUNKTIONSFARBEN EINRICHTEN
    --btn-color-bg: transparent;
    --btn-color: #E83623;
    --btn-color-border: #E83623;
  }

  &__input {
    display: none;
  }

}
</style>
