<template>
  <base-input
    v-bind="{ ...$props, ...$attrs, }"
    type="textarea"
    :maxLength="maxCount"
    @input="update($event.target.value)"
    @blur="update($event.target.value)"
    @change="update($event.target.value)">
    <template #count>
      <span v-if="maxCount">
        {{ currentLength }} / {{ maxCount }} Zeichen
      </span>
    </template>
  </base-input>
</template>

<script>
// import { computed, ref, watchEffect } from 'vue';
import { computed } from 'vue';
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
  name: 'BaseTextarea',
  components: {
    BaseInput,
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {DateInputModelValue} val - Input Value
     */
    'update:modelValue',
  ],
  props: {
    ...baseInputProps,
    maxCount: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const currentLength = computed(() => props.modelValue?.length || 0);
    /**
     * Set dotted value but emit iso Date
     * @param {String} value - Format 'dd.MM.yyyy'
     */
    function update(value) {
      emit('update:modelValue', value);
    }
    return {
      update,
      currentLength,
    };
  },
};
</script>
