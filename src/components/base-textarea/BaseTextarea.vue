<template>
  <base-input
    v-bind="{ ...$props, ...$attrs, }"
    type="textarea"
    :error-message="errorMessage"
    @input="update($event.target.value)"
    @blur="update($event.target.value)"
    @change="update($event.target.value)">
    <template #count>
      <span v-if="$attrs.maxLength">
        {{ currentLength }} / {{ $attrs.maxLength }} Zeichen
      </span>
    </template>
  </base-input>
</template>

<script>
import { computed } from 'vue';
import BaseInput, {
  modifier,
  baseInputProps,
} from '@/components/base-input/BaseInput.vue';
/**
 * @typedef {string|null} BaseTextareaModelValue
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
     * @property {BaseTextareaModelValue} val - Input Value
     */
    'update:modelValue',
  ],
  props: {
    ...baseInputProps,
  },
  setup(props, { attrs, emit }) {
    const currentLength = computed(() => props.modelValue?.length || 0);
    const errorMessage = computed(() => {
      if (attrs.maxLength && (attrs.maxLength < currentLength.value)) {
        return 'Die maximale Anzahl an Zeichen ist erreicht.';
      }
      return props.errorMessage;
    });
    function update(value) {
      emit('update:modelValue', value);
    }
    return {
      update,
      currentLength,
      errorMessage,
    };
  },
};
</script>
