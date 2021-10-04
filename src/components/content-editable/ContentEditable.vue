<template>
  <div
    :data-value="localModel"
    class="content-editable">
    <span>bla {{ localModel }}</span>
    <textarea
      v-bind="{ ...$props, ...$attrs, }"
      class="content-editable__input"
      v-model="localModel"></textarea>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ContentEditable',
  props: {
    tag: {
      type: String,
      default: 'textarea',
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: {
    'update:modelValue': String,
  },
  setup(props, { emit }) {
    const localModel = computed({
      get: () => props.modelValue,
      set: (value) => {
        console.log('set', value);
        emit('update:modelValue', value);
      },
    });
    return {
      localModel,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-editable {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;

  // stacked
  align-items: stretch;
  border: 1px solid green;

  &::after,
  &__input {
    grid-area: 2 / 1;
  }

  &::after,
  &__input {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }

  &:focus-within {
    outline: solid 1px blue;
    box-shadow: 4px 4px 0px blue;

    > span { color: blue; }

    textarea:focus,
    input:focus {
      outline: none;
    }
  }
}
</style>
