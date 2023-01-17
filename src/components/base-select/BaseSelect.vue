<template>
  <div :class="$attrs.class">
    <label
      :class="[
        getModifierClasses('field', modifier),
        {
        'field--error': errorMessage,
        'field--dark': isDarkMode,
        'field--disabled': $attrs.disabled,
        'field--fake-focus': hasFocus,
        }
      ]"
      class="field">
      <select
        ref="input"
        v-bind="removeByKey($attrs, 'class')"
        :value="modelValue"
        @change="updateValue($event.target.value)"
        @focus="handleFocus()"
        @blur="handleBlur()"
        class="field__input"
        :class="[
          { 'field__input--not-empty' : isFilled },
        ]">
        <!--
          @slot optional Options Slot
        -->
        <slot name="items">
          <option
            v-for="(option, index) in items"
            :key="index">{{ option }}</option>
        </slot>
      </select>
      <span
        class="field__text"
        v-if="label">{{ label }}</span>
      <icon-arrow-down
        aria-hidden="true"
        class="field__icon" />
      <span
        class="field__btn-wrapper"
      >
        <!--
          @slot Alternate Button Slot
        -->
        <slot name="alternate-button" />
      </span>
    </label>
    <div
      v-if="errorMessage"
      class="additional">
      <span>
        <error-text
          v-if="errorMessage"
          class="error-message"
          :error-message="errorMessage" />
      </span>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
} from 'vue';
import {
  useDebounceFn,
} from '@vueuse/core';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import ErrorText from '@/components/error-message/ErrorMessage.vue';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

/**
 * @typedef {string|number|null} BaseInputModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
];

export const baseSelectProps = {
  label: {
    type: String,
    default: null,
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  /**
   * @model
   */
  modelValue: {
    type: [String, Number],
    default: null,
  },
  items: {
    type: Array,
    default: null,
  },
  /**
   * Rendering Error Message if not null
   */
  errorMessage: {
    type: String,
    default: null,
  },
  /**
   * Optional Debounce e.g for Search
   */
  debounce: {
    type: Number,
    default: 0,
  },
  modifier: {
    type: [String, Array],
    default: null,
    validator: (value) => validateValueWithList(value, modifier),
  },
};
export default {
  name: 'BaseSelect',
  components: {
    ErrorText,
    IconArrowDown,
  },
  inheritAttrs: false,
  emits: [
    /**
     * Fires on Model Update
     * @property {BaseInputModelValue} val - Input Value
     */
    'update:modelValue',
  ],
  props: baseSelectProps,
  setup(props, { emit }) {
    const hasFocus = ref(false);
    const { getModifierClasses } = useModifier();
    /**
     * Removes Key from Object
     * @param {object} myObj
     * @param {string} deleteKey
     */
    function removeByKey(myObj, deleteKey) {
      return Object.keys(myObj)
        .filter((key) => key !== deleteKey)
        .reduce((res, current) => {
          const result = res;
          result[current] = myObj[current];
          return result;
        }, {});
    }

    /**
     * Template Ref
     * @type {ToRef<null>}
     */
    const input = ref(null);
    const isFilled = computed(() => !!props.modelValue);
    /**
     * Emit Model Value
     * @param {BaseInputModelValue} val
     */
    const emitValue = (val) => {
      emit('update:modelValue', val);
    };
    /**
     * Update with optional debounce
     * @type {(function(*=): void)|*}
     */
    const updateValue = useDebounceFn((val) => {
      emitValue(val);
    }, props.debounce);
    /**
     * Clear Input Value
     */
    const clearInput = () => {
      emitValue(null);
      emit('cleared');
    };
    const handleFocus = () => {
      hasFocus.value = true;
    };
    const handleBlur = () => {
      hasFocus.value = false;
    };
    return {
      getModifierClasses,
      removeByKey,
      input,
      isFilled,
      updateValue,
      clearInput,
      handleFocus,
      handleBlur,
      hasFocus,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
@import '~@/assets/styles/colors.scss';
@import '~@/assets/styles/form.scss';
label {
  display: block;
  font-size: 1.8rem;
  color: #777;
}

.field {
  $self: &;
  --field-color-label: var(--brand-color-gray-carbon);
  --field-color-bg: var(--brand-color-white);
  --field-color-input: var(--brand-color-anthracite);
  --field-color-border: var(--brand-color-gray-stone);

  --field-font-size: var(--form-input-font-size, 1.125rem);
  --field-label-font-size: var(--field-font-size);

  --field-padding-v: var(--form-input-padding, 1.125rem);
  --field-padding-h: var(--form-input-padding, 1.125rem);

  --field-border-size: var(--form-input-border-size, 1px);
  --field-min-height: var(--form-input-height, 3.75rem);
  --icon-size: var(--field-icon-size, 1.5rem);

  --select-rotate: 0deg;

  position: relative;
  font-size: var(--field-font-size);
  font-weight: 300;
  height: var(--field-min-height);
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;

  &--dark {
    --field-color-label: var(--brand-color-gray-stone);
    --field-color-bg: transparent;
    --field-color-input: var(--brand-color-white);
    --field-color-border: var(--brand-color-gray-graphite);
  }

  &--disabled,
  &__input[disabled] {
    --field-color-border: var(--brand-color-gray-stone);
    --field-color-bg: var(--brand-color-gray-chalk);
    --field-color-input: var(--brand-color-gray-cement);
    --field-color-label: var(--brand-color-gray-stone);
  }
  &--dark#{$self}--disabled,
  &--dark &__input[disabled] {
    --field-color-border: var(--brand-color-gray-coal);
    --field-color-bg: var(--brand-color-gray-coal);
    --field-color-input: var(--brand-color-gray-cement);
    --field-color-label: var(--brand-color-gray-cement);
  }

  &--error {
    & {
      --field-color-border: var(--functional-color-error);
      --field-color-bg: var(--functional-color-error-1-light);
      --field-color-label: var(--functional-color-error);
    }
    &#{$self}--dark {
      --field-color-bg: var(--functional-color-error-1-dark);
    }
  }

  &:hover:not(&--fake-focus),
  &--fake-hover {
    --field-color-border: var(--brand-color-gray-graphite);
    &#{$self}--dark {
      --field-color-border: var(--brand-color-gray-cement);
    }
  }
  &--fake-focus {
    --field-color-border: var(--brand-color-anthracite);
    &#{$self}--dark {
      --field-color-border: var(--brand-color-gray-stone);
    }
  }
  &__input {
    -webkit-appearance: none;
    line-height: 1.313rem;
    /**
    -webkit-autofill::first-line hack for overwrite webkit autofill styles
    **/
    &,
    &:-webkit-autofill::first-line {
      box-sizing: border-box;
      font-size: var(--field-font-size);
      font-family: var(--font-stack-normal, inherit);
      color: var(--field-color-input);
    }
    border: var(--field-border-size) solid var(--field-color-border);
    border-radius: var(--form-input-border-radius, 0.5rem);
    padding: var(--field-padding-v) var(--field-padding-h) 0.688rem;
    // padding: var(--field-padding-v) var(--field-padding-h);
    background: var(--field-color-bg);
    width: 100%;
    height: 100%;
    font-weight: 300;

    #{$self}--fake-focus &,
    &:focus {
      border-width: calc(var(--field-border-size) + 0.031rem);
    }
    #{$self}--fake-focus &,
    &:focus,
    &--not-empty {
      &::placeholder {
        color: var(--field-color-input);
      }
      // Overwrite Browser Date Color
      &[type="date"] {
        color: var(--field-color-input);
      }
      & + .field__text {
        --field-label-font-size: 0.875rem;
        top: 0.875rem;
        transform: translate3d(var(--field-padding-h), 0, 0);
        #{$self}--dark:not(#{$self}--error) & {
          --field-color-label: var(--brand-color-gray-cement);
        }
      }
    }
    &:focus,
    // @TODO Designer Accessibility Workshop!
    &:focus {
      outline: none;
    }
    &:focus-visible {
      border-color: var(--field-color-border);
    }
    &::placeholder {
      color: transparent;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: var(--field-padding-h);
    translate: 0 -50% 0;
    rotate: var(--select-rotate);
    transition: 200ms ease rotate;
    pointer-events: none;
  }
  &__text {
    font-size: var(--field-label-font-size);
    position: absolute;
    // top: 50%;
    top: calc(var(--field-min-height) / 2);
    transform: translate3d(var(--field-padding-h), 0, 0);
    display: block;
    line-height: 0;
    color: var(--field-color-label);
  }
  &__btn-wrapper {
    position: absolute;
    right: calc(var(--field-padding-h) / 2);
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}

.additional {
  display: grid;
  width: 100%;
  grid-gap: 0.625rem;
  grid-template-columns: auto auto;
  justify-content: space-between;
  font-size: 0.875rem;
  padding-top: 6px;
}
</style>
