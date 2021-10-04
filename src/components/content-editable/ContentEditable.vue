<template>
  <div
    :data-replicated-value="modelValue"
    class="content-editable">
    <textarea
      class="content-editable__input"
      :model-value="modelValue"
      rows="1"
      v-bind="{ ...$props, ...$attrs, }"
      @focus="$emit('focus')"
      @input="updateValue($event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  name: 'ContentEditable',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: {
    'update:modelValue': String,
  },
  setup(props, { emit }) {
    const updateValue = (val) => {
      emit('update:modelValue', val);
    };
    return {
      updateValue,
    };
  },
};
</script>

<style lang="scss" scoped>
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

.content-editable-bu {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  text-align: left;
  // width: 100%;

  // stacked
  // align-items: stretch;
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
    border: 1px solid red;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
    border: 1px solid orange;
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
