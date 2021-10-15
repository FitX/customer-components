<template>
  <base-input
    :label="label"
    v-bind="{ ...$props, ...$attrs, }"
    :model-value="dottedDate"
    v-maska="'##.##.####'"
    :error-message="errorMessage"
    @input="update($event.target.value)"
    @blur="update($event.target.value)"
    @change="update($event.target.value)"></base-input>
</template>

<script>
import { maska } from 'maska';
import { computed, ref, watchEffect } from 'vue';
import BaseInput, {
  modifier,
  baseInputProps,
} from '@/components/base-input/BaseInput.vue';
import { formatDateToIso, formatDateFromIso } from '@/use/formatDate';

/**
 * Date Format for Model: 'yyyy-MM-dd'
 * @typedef {string} DateInputStringFormat - 'yyyy-MM-dd'
 */
/**
 * @typedef {DateInputStringFormat|null} DateInputModelValue
 */

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
     * @property {DateInputModelValue} val - Input Value
     */
    'update:modelValue',
  ],
  directives: {
    maska,
  },
  props: baseInputProps,
  // For Web Components Build
  styles: BaseInput.styles,
  setup(props, { emit }) {
    // Dotted Date from Iso Model Value
    const dottedDate = ref(formatDateFromIso(props.modelValue));
    // Iso Date from dotted value
    const isoDate = computed(() => (formatDateToIso(dottedDate.value)));
    /**
     * Set dotted value but emit iso Date
     * @param {String} value - Format 'dd.MM.yyyy'
     */
    function update(value) {
      dottedDate.value = value;
      emit('update:modelValue', isoDate.value);
    }
    /**
     * Overwrite async model-value changes
     */
    watchEffect(() => {
      if (props.modelValue && !dottedDate.value) {
        dottedDate.value = formatDateFromIso(props.modelValue);
      }
    });
    return {
      update,
      isoDate,
      dottedDate,
    };
  },
};
</script>
