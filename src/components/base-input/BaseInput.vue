<template>
  <div :class="$attrs.class">
    <label
      :class="[
        getModifierClasses('field', modifier),
        {
        'field--error': errorMessage,
        'field--dark': isDarkMode,
        'field--valid': isValid,
        'field--disabled': $attrs.disabled,
        'field--fake-focus': hasFocus,
        }
      ]"
      class="field">
      <input
        ref="input"
        v-bind="removeByKey($attrs, 'class')"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        @focus="handleFocus()"
        @blur="handleBlur()"
        class="field__input"
        :class="[
          { 'field__input--not-empty' : isFilled },
          { 'field__input--auto-filled' : !!autofilled }
        ]">
      <span
        class="field__text"
        v-if="label">{{ label }}</span>
      <button
        class="field__icon clearable-icon"
        @click.prevent="clearInput()"
        v-if="clearable">x</button>
      <valid-icon
        class="field__icon valid-icon"
        v-if="isValid && modelValue" />
      <span
        class="field__btn-wrapper"
      >
        <!--
          @slot Default Content Slot
        -->
        <slot />
      </span>
    </label>
    <error-text
      v-if="errorMessage"
      class="error-message"
      :error-message="errorMessage" />
  </div>
</template>

<script>
import {
  defineAsyncComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
} from 'vue';
import {
  useDebounceFn,
} from '@vueuse/core';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

/**
 * @typedef {string|number|null} BaseInputModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
];

export default {
  components: {
    ErrorText: defineAsyncComponent(() => import('@/components/error-message/ErrorMessage.vue')),
    ValidIcon: defineAsyncComponent(() => import('@/components/valid-icon/ValidIcon.vue')),
  },
  inheritAttrs: false,
  emits: [
    /**
     * Fires on Model Update
     * @property {BaseInputModelValue} val - Input Value
     */
    'update:modelValue',
    /**
     * Fires when detecting Autofill
     * @type {event} Dom Event
     */
    'auto-filled',
    /**
     * Fires when Input cleared
     * @type {event} Dom Event
     */
    'cleared',
  ],
  props: {
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
    /**
     * Rendering Error Message if not null
     */
    errorMessage: {
      type: String,
      default: null,
    },
    /**
     * Rendering Valid State
     */
    isValid: {
      type: Boolean,
      default: false,
    },
    /**
     * Option for clearing Input Value
     */
    clearable: {
      type: Boolean,
      default: false,
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
  },
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
    const autofilled = ref(false);
    const isFilled = computed(() => !!props.modelValue);

    /**
     * Detect autofilled for correct Rendering
     * @param e
     */
    function handleAutofilled(e) {
      const isAutoFilled = /^onAutoFillStart/.test(e.animationName);
      autofilled.value = isAutoFilled;
      emit('auto-filled', true);
    }
    onMounted(() => {
      if (input.value) {
        /**
         * Trigger Autofill
         */
        input.value.addEventListener('animationstart', handleAutofilled);
      }
    });
    onBeforeUnmount(() => {
      if (input.value) {
        input.value.removeEventListener('animationstart', handleAutofilled);
      }
    });
    /**
     * Emit Model Value
     * @param {BaseInputModelValue} val
     */
    const emitValue = (val) => emit('update:modelValue', val);
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
      console.log('focus');
    };
    const handleBlur = () => {
      hasFocus.value = false;
      console.log('kein focus');
    };
    return {
      getModifierClasses,
      removeByKey,
      input,
      autofilled,
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

  --field-font-size: 1.8rem;
  --field-label-font-size: var(--field-font-size);

  --field-padding-v: 1.8rem;
  --field-padding-h: 2rem;

  --field-border-size: 1px;

  position: relative;
  font-size: var(--field-font-size);
  height: 6rem;

  &--dark {
    --field-color-label: var(--brand-color-gray-stone);
    --field-color-bg: transparent;
    --field-color-input: var(--brand-color-white);
    --field-color-border: var(--brand-color-gray-carbon);
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
    --field-color-border: var(--functional-color-error);
    --field-color-bg: var(--functional-color-error-1-light);
    --field-color-label: var(--functional-color-error);
  }

  &:hover,
  &--fake-hover {
    --field-color-border: var(--brand-color-gray-graphite);
  }
  &--fake-focus {
    --field-color-border: var(--brand-color-anthracite);
    &#{$self}--dark {
      --field-color-border: var(--brand-color-gray-cement);
    }
  }
  &__input {
    -webkit-appearance: none;
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
    border-radius: 0.8rem;
    padding: var(--field-padding-v) var(--field-padding-h) 0.6rem;
    background: var(--field-color-bg);
    width: 100%;
    height: 100%;
    // hack placeholder like default input 1/2
    &[type="date"] {
      color: transparent;
      // appearance: none;
      &::-webkit-calendar-picker-indicator {
        opacity: 0;
      }
    }
    #{$self}--fake-focus &,
    &:focus,
    &--not-empty,
    &--auto-filled {
      // Overwrite Browser Date Color
      &[type="date"] {
        color: var(--field-color-input);
      }
      & + .field__text {
        --field-label-font-size: 1.4rem;
        top: 1rem;
        transform: translate3d(var(--field-padding-h), 0, 0);
        #{$self}--dark & {
          --field-color-label: var(--brand-color-gray-cement);
        }
      }
    }
    // @TODO Designer Accessibility Workshop!
    &:focus {
      outline: none;
    }
    &:focus-visible {
      border-color: var(--field-color-border)
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: var(--field-padding-h);
    transform: translate3d(0, -50%, 0);
  }
  &__text {
    font-size: var(--field-label-font-size);
    position: absolute;
    top: 50%;
    transform: translate3d(var(--field-padding-h), -50%, 0);
    display: block;
    line-height: 1;
    color: var(--field-color-label);
  }
  &__btn-wrapper {
    position: absolute;
    right: calc(var(--field-padding-h) / 2);
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}
.error-message {
  padding-top: 0.6rem;
}

.clearable-icon {
  @include btn-reset();
  background: #fff;
  border-radius: 10rem;
}
</style>

<style lang="scss">
/* Temp Fix */
input:-webkit-autofill {
  // Expose a hook for JavaScript when auto fill is shown.
  // JavaScript can capture 'animationstart' events
  animation-name: onAutoFillStart;
  animation-duration: 5000s;
  // Make the background color become yellow really slow
  transition: background-color 50000s ease-in-out 0s;
  background: red !important;
}
input:not(:-webkit-autofill) {
  // Expose a hook for JS onAutoFillCancel
  // JavaScript can capture 'animationstart' events
  animation-name: onAutoFillCancel;
}
// For trigger webkit-autofill in js
@keyframes onAutoFillStart {
  from {/**/}
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes onAutoFillCancel {
  from {/**/}
  to {/**/}
}
</style>
