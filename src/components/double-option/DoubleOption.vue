<template>
  <div class="double-option">
    <base-option-form
      v-for="{ title, value } in options"
      :modifier="modifier"
      :key="value"
      :is-dark-mode="isDarkMode"
      v-model="computedValue"
      :title="title"
      :value="value"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import validateValueWithList from '@/use/validate-value-with-list';
import useModifier from '@/use/modifier-class';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';

/**
 * @typedef @TODO DoubleOption
 */

export const modifier = [
  'disabled',
];

export default {
  name: 'DoubleOption',
  components: {
    BaseOptionForm,
  },
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
        String,
        Number,
      ],
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => value.every((option) => {
        const hasTitle = Object.prototype.hasOwnProperty.call(option, 'title');
        const hasValue = Object.prototype.hasOwnProperty.call(option, 'value');
        return hasTitle && hasValue;
      }),
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {DoubleOptionModelValue} val - Model Value
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
    const { getModifierClasses } = useModifier();
    return {
      computedValue,
      getModifierClasses,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';

.double-option {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(10px, 1fr));
  :deep(.btn):first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  :deep(.btn):last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
