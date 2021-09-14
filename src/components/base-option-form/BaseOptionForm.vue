<template>
  <button
    v-bind="$attrs"
    :class="[
      getModifierClasses('btn', modifier),
      { 'btn--dark' : isDarkMode },
      { 'btn--active' : localIsActive },
    ]"
    @click="handleClick"
    class="btn">
    <!--
      @slot Default Content Slot
    -->
    <slot>
      {{ title }}
    </slot>
  </button>
</template>

<script>
import { ref } from 'vue';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

export const modifier = [
  'disabled',
  'error',
  'fake-hover',
];

export default {
  name: 'BaseOptionForm',
  emits: [
    /**
     * Fires when selected
     * @type {event} Dom Event
     */
    'selected',
    /**
     * Fires when unselected
     * @type {event} Dom Event
     */
    'unselected',
  ],
  props: {
    /**
     * optional Title, rendered in default slot
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * Option to render in Dark Mode
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * If activated
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * Component Modifier
     */
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
  },
  setup(props, { emit }) {
    const { getModifierClasses } = useModifier();
    const localIsActive = ref(props.isActive);
    /**
     * Toggle Button State and emit current state
     *
     * @public
     * @param {object} Dom Event
     */
    function handleClick(e) {
      if (localIsActive.value) {
        /**
         * Unselected event.
         *
         * @event unselected
         * @type {object}
         */
        emit('unselected', e);
      } else {
        /**
         * selected event.
         *
         * @event selected
         * @type {object}
         */
        emit('selected', e);
      }

      localIsActive.value = !localIsActive.value;
    }
    return {
      getModifierClasses,
      handleClick,
      localIsActive,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import 'src/assets/styles/mixin-reset.scss';
.btn {
  @include btn-reset();

  $self: &;
  --btn-color-bg: #fff;
  --btn-color-border: var(--brand-color-gray-stone);
  --btn-color: var(--brand-color-anthracite);
  --btn-font-size: 1.8rem;
  --btn-padding: 1.8rem;
  --btn-border-width: 1px;

  height: 6rem;
  font-size: var(--btn-font-size);
  font-weight: 400;
  background: var(--btn-color-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  border: var(--btn-border-width) solid var(--btn-color-border);
  border-radius: 0.8rem;
  cursor: pointer;
  text-align: center;

  &:hover,
  &--fake-hover {
    --btn-color-bg: var(--brand-color-gray-chalk);
  }

  &--active {
    &,
    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-anthracite-1);
      --btn-color-border: var(--btn-color-bg);
      --btn-color: #fff;
    }
  }

  &:disabled,
  &--disabled {
    &,
    &:hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
      --btn-color-border: var(--brand-color-gray-ash);
      --btn-color: var(--brand-color-gray-cement);
      cursor: not-allowed;
    }
  }

  &--dark {
    --btn-color-bg: transparent;
    --btn-color: #fff;
    --btn-color-border: var(--brand-color-gray-stone);

    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-gray-coal);
    }

    &:disabled,
    &#{$self}--disabled {
      &,
      &:hover {
        --btn-color-bg: transparent;
        --btn-color: var(--brand-color-gray-cement);
        --btn-color-border: var(--brand-color-gray-carbon);
      }
    }
    &#{$self}--active {
      &,
      &:hover,
      &#{$self}--fake-hover {
        --btn-color-bg: #fff;
        --btn-color-border: #fff;
        --btn-color: var(--brand-color-anthracite);
      }
    }
  }

  &--error {
    // @TODO FUNKTIONSFARBEN EINRICHTEN
    --btn-color-bg: transparent;
    --btn-color: #E83623;
    --btn-color-border: #E83623;
  }

}
</style>
