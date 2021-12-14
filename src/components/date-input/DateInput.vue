<template>
  <base-input
    :label="label"
    v-bind="{ ...$props, ...$attrs, }"
    :value="modelValue"
    @input="(event) => {
      // Overwrite for sync
      event.target.value = update(event.target.value);
    }"
    :error-message="errorMessage"
    type="text"
    pattern="[0-9]*"
    inputmode="numeric"
    placeholder="TT.MM.JJJJ"
  ></base-input>
</template>

<script>
import BaseInput, {
  modifier,
  baseInputProps,
} from '@/components/base-input/BaseInput.vue';

const { useDateInput } = require('@fitx/date-input/dist/index.cjs');
/**
 * Modifier used from BaseInput
 * @description lorem
 */
export { modifier };
export { baseInputProps };
export default {
  name: 'DateInput',
  components: {
    BaseInput,
  },
  inheritAttrs: false,
  emits: [
    /**
     * Fires on Model Update
     */
    'update:modelValue',
  ],
  props: {
    ...baseInputProps,
    lang: {
      type: String,
      default: 'de',
    },
  },
  // For Web Components Build
  styles: BaseInput.styles,
  setup(props, { emit }) {
    const {
      handleInput,
    } = useDateInput({ lang: props.lang });
    const update = (newVal) => {
      const formatted = handleInput(newVal);
      emit('update:modelValue', formatted);
      return formatted;
    };
    return {
      handleInput,
      update,
    };
  },
};
</script>
