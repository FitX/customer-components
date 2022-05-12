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
        'field--textarea': $attrs.type === 'textarea',
        }
      ]"
      class="field">
      <div
        v-if="$attrs.type === 'textarea'"
        ref="input"
        class="field__input field__input--textarea"
        :class="[
          { 'field__input--not-empty' : isFilled },
          { 'field__input--auto-filled' : !!autofilled }
        ]">
        <div
          :data-replicated-value="modelValue"
          :class="[
          { 'content-editable' : !disableAutoHeight }
        ]">
          <textarea
            :class="[
            { 'content-editable__input' : !disableAutoHeight }
          ]"
            :value="modelValue"
            :rows="$attrs.rows || 1"
            @input="updateValue($event.target.value)"
            @focus="handleFocus()"
            @blur="handleBlur()"
            v-bind="removeByKey($attrs, 'class')"></textarea>
        </div>
      </div>
      <input
        v-else
        ref="input"
        v-bind="removeByKey($attrs, 'class')"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        @focus="handleFocus()"
        @blur="handleBlur()"
        class="field__input"
        :type="localType"
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
        v-if="clearable">
        <icon-clear />
      </button>
      <valid-icon
        class="field__icon valid-icon"
        v-if="isValid && modelValue" />
      <button
        class="field__password-text"
        @click.prevent="toggleShowPassword()"
        v-if="$attrs.type === 'password'">
        {{ passwordToggleText }}
      </button>
      <span
        class="field__btn-wrapper"
      >
        <!--
          @slot Default Content Slot
        -->
        <slot />
      </span>
    </label>
    <div
      v-if="errorMessage || $slots.count"
      class="additional">
      <span>
        <error-text
          v-if="errorMessage"
          class="error-message"
          :error-message="errorMessage" />
      </span>
      <span class="additional__count">
        <slot name="count" />
      </span>
    </div>
  </div>
</template>

<script>
import {
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
import ErrorText from '@/components/error-message/ErrorMessage.vue';
import ValidIcon from '@/components/valid-icon/ValidIcon.vue';
import IconClear from '@/assets/icons/icon-clear.svg';

/**
 * @typedef {string|number|null} BaseInputModelValue
 */

export const modifier = [
  'disabled',
  'fake-focus',
  'fake-hover',
];

export const baseInputProps = {
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
  /**
   * Disable Auto Height (For Textarea only)
   */
  disableAutoHeight: {
    type: Boolean,
    default: false,
  },
  modifier: {
    type: [String, Array],
    default: null,
    validator: (value) => validateValueWithList(value, modifier),
  },
  /**
   * Text if Password is hidden (For type[password] only)
   */
  textPasswordShow: {
    type: String,
    default: 'Anzeigen',
  },
  /**
   * Text if Password is shown (For type[password] only)
   */
  textPasswordHide: {
    type: String,
    default: 'Verbergen',
  },
};
export default {
  name: 'BaseInput',
  components: {
    ErrorText,
    ValidIcon,
    IconClear,
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
  props: baseInputProps,
  setup(props, { emit, attrs }) {
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
    const showPassword = ref(false);
    const passwordToggleText = computed(() => (
      showPassword.value ? props.textPasswordHide : props.textPasswordShow));
    const localType = computed(() => showPassword.value ? 'text' : attrs.type);

    /**
     * Detect autofilled for correct Rendering
     * @param e
     */
    /* istanbul ignore next */
    function handleAutofilled(e) {
      const isAutoFilled = /^onAutoFillStart/.test(e.animationName);
      autofilled.value = isAutoFilled;
      emit('auto-filled', true);
    }
    /* istanbul ignore next */
    onMounted(() => {
      if (input.value) {
        /**
         * Trigger Autofill
         */
        input.value.addEventListener('animationstart', handleAutofilled);
      }
    });
    /* istanbul ignore next */
    onBeforeUnmount(() => {
      if (input.value) {
        input.value.removeEventListener('animationstart', handleAutofilled);
      }
    });
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
    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
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
      toggleShowPassword,
      passwordToggleText,
      localType,
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

  --field-font-size: var(--form-input-font-size, 1.8rem);
  --field-label-font-size: var(--field-font-size);

  --field-padding-v: var(--form-input-padding, 1.8rem);
  --field-padding-h: var(--form-input-padding, 1.8rem);

  --field-border-size: var(--form-input-border-size, 0.1rem);
  --field-min-height: var(--form-input-height, 6rem);
  --icon-size: var(--field-icon-size, 2.4rem);

  position: relative;
  font-size: var(--field-font-size);
  font-weight: 300;
  height: var(--field-min-height);
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;

  &--textarea {
    min-height: var(--field-min-height);
    height: auto;
  }

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
    line-height: 2.1rem;
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
    border-radius: var(--form-input-border-radius, 0.8rem);
    padding: var(--field-padding-v) var(--field-padding-h) 1.1rem;
    // padding: var(--field-padding-v) var(--field-padding-h);
    background: var(--field-color-bg);
    width: 100%;
    height: 100%;
    font-weight: 300;

    &--textarea {
      .content-editable {
        --textarea-extra-spacing: 0.3rem;
        margin-top: var(--textarea-extra-spacing); // fake real input spacing
        min-height: calc(100% + var(--textarea-extra-spacing));
      }
      textarea,
      .content-editable {
        color: currentColor;
        border: none;
        width: 100%;
        font: inherit;
        resize: none;

        &:focus,
        :focus-within &:focus {
          outline: none;
        }
      }
    }
    // hack placeholder like default input 1/2
    &[type="date"] {
      color: transparent;
      &::-webkit-calendar-picker-indicator {
        opacity: 0;
      }
    }
    #{$self}--fake-focus &,
    &:focus {
      border-width: calc(var(--field-border-size) + 0.05rem);
    }
    #{$self}--fake-focus &,
    &:focus,
    &--not-empty,
    &--auto-filled {
      &::placeholder {
        color: var(--field-color-input);
      }
      // Overwrite Browser Date Color
      &[type="date"] {
        color: var(--field-color-input);
      }
      & + .field__text {
        --field-label-font-size: 1.4rem;
        top: 1.4rem;
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
      border-color: var(--field-color-border)
    }
    &::placeholder {
      color: transparent;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: var(--field-padding-h);
    transform: translate3d(0, -50%, 0);
    #{$self}--textarea & {
      display: none;
    }
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
  &__password-text {
    @include btn-reset();
    background: var(--field-color-bg);
    font-size: 1.4rem;
    font-weight: 100;
    color: var(--field-color-label);
    position: absolute;
    right: var(--field-padding-h);
    top: 50%;
    transform: translate3d(0, -50%, 0);
    transition: right 150ms ease;
    /**
    Extra Spacing if Valid Icon is shown
     */
    .valid-icon + & {
      right: calc(( 2 * var(--field-padding-h)) + var(--icon-size));
    }
  }
  &__btn-wrapper {
    position: absolute;
    right: calc(var(--field-padding-h) / 2);
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}

/**
  Temp @TODO optimize after Icons are final
 */
.clearable-icon {
  @include btn-reset();
  background: none;
  line-height: 0;
  --icon-width: 1.8rem;
  --icon-height: 1.8rem;
  --icon-fill: var(--brand-color-gray-carbon);
}
.additional {
  display: grid;
  width: 100%;
  grid-gap: 1rem;
  grid-template-columns: auto auto;
  justify-content: space-between;
  font-size: 1.4rem;
  padding-top: 0.6rem;

  &__count {
    justify-self: flex-end;
    align-self: center;
  }
}
</style>

<style lang="scss" scoped>
/**
  Extra Styles for Textarea
*/
/**
  Inspired by
  @link https://css-tricks.com/auto-growing-inputs-textareas/
  @link https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
 */
.content-editable {
  $self: &;
  /* easy way to plop the elements on top of each other and have them both
  sized based on the tallest one's height */
  display: grid;

  &::after {
    /* Note the weird space! Needed to prevent jumpy behavior */
    content: attr(data-replicated-value) " ";
    /* This is how textarea text behaves */
    white-space: pre-wrap;
    /* Hidden from view, clicks, and screen readers */
    visibility: hidden;
  }

  &__input {
    appearance: none;
    /* You could leave this, but after a user resizes, then it ruins the auto sizing */
    resize: none;
    /* Firefox shows scrollbar on growth, you can hide like this. */
    overflow: hidden;
  }

  &::after,
  &__input {
    /* Identical styling required!! */
    border: none;
    padding: 0;
    background: transparent;
    font: inherit;
    // align-self: stretch;

    /* Place on top of each other */
    grid-area: 1 / 1 / 2 / 2;
    &:focus {
      outline: none;
      border: none;
    }
  }

  &:focus-within {
    #{$self}__input:focus {
      outline: none;
    }
  }
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
