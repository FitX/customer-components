<template>
  <base-input
    :label="label"
    v-bind="{ ...$props, ...$attrs, }"
    :model-value="dottedDate"
    v-maska="'##.##.####'"
    :error-message="errorMessage"
    @input="update($event.target.value)"
    @blur="update($event.target.value)"
    @change="update($event.target.value)"
  />
</template>

<script>
import { maska } from 'maska';
import { computed, ref, watchEffect } from 'vue';
import BaseInput, {
  modifier,
  baseInputProps,
} from '@/components/base-input/BaseInput.vue';

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
  setup(props, { emit }) {
    /**
     * Format dotted Date to Iso
     * @param {String} dottedDate - Format 'dd.MM.yyyy'
     * @return {string|null}
     */
    function formatDateToIso(dottedDate = '') {
      if (dottedDate?.toString().length === 10) {
        const d = dottedDate.substring(0, 2);
        const m = dottedDate.substring(3, 5);
        const y = dottedDate.substring(6, 10);
        return `${y}-${m}-${d}`;
      }
      return null;
    }
    /**
     * Format Iso Date to dotted
     * @param {String} isoDate - Format 'yyyy-MM-dd'
     * @return {string|null}
     */
    function formatDateFromIso(isoDate = '') {
      if (isoDate?.toString().length === 10) {
        const y = isoDate.substring(0, 4);
        const m = isoDate.substring(5, 7);
        const d = isoDate.substring(8, 10);
        return `${d}.${m}.${y}`;
      }
      return null;
    }
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
