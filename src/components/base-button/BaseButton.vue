<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="[
      getModifierClasses('btn', modifier),
      { 'btn--dark' : isDarkMode },
      { 'btn--active' : isActive }
    ]"
    class="btn">
    <span />
    <slot>
      {{ text }}
    </slot>
    <span
      v-if="isActive"
      class="btn__loading" />
  </component>
</template>

<script>
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

export const modifier = [
  'secondary',
  'tertiary',
  'quaternary',
  'disabled',
  'small',
  'fake-hover',
];

export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    text: {
      type: String,
      default: null,
    },
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
  },
  setup() {
    const { getModifierClasses } = useModifier();
    return {
      getModifierClasses,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.btn {
  @include btn-reset();

  $self: &;
  --btn-color-bg: var(--primary-brand-color-orange, #ED6A12);
  --btn-color-border: var(--btn-color-bg);
  --btn-color: #fff;
  --btn-font-size: 1.8rem;
  --btn-padding: 1.5rem;
  --btn-border-width: 2px;
  --loader-size: 0;
  --loader-gap: 0;
  display: grid;
  grid-template-columns: var(--loader-size) 1fr var(--loader-size);
  gap: var(--loader-gap);
  align-items: center;
  position: relative;
  width: 28rem;
  max-width: 100%;
  font-size: var(--btn-font-size);
  font-weight: 400;
  background: var(--btn-color-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  border: var(--btn-border-width) solid var(--btn-color-border);
  border-radius: 2.6rem;
  cursor: pointer;
  text-align: center;
  &:hover,
  &--fake-hover {
    --btn-color-bg: var(--brand-color-orange-1);
  }

  &:disabled,
  &--disabled {
    &,
    &:hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
      --btn-color: var(--brand-color-gray-cement);
      cursor: not-allowed;
    }
    &#{$self}--dark {
      &,
      &:hover {
        --btn-color-bg: var(--brand-color-anthracite-3);
        --btn-color: var(--brand-color-gray-cement);
      }
    }
  }

  &--small {
    --btn-font-size: 1.6rem;
    --btn-padding: 0.7rem;
    --btn-border-width: 1px;
    padding: var(--btn-padding) calc(3 * var(--btn-padding));
    display: inline-grid;
    width: auto;
  }

  &--secondary {
    --btn-color-bg: transparent;
    --btn-color-border: var(--brand-color-anthracite);
    --btn-color: var(--brand-color-anthracite);

    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
    }
    &:disabled,
    &#{$self}--disabled {
      &,
      &:hover {
        --btn-color-bg: transparent;
        --btn-color: var(--brand-color-gray-cement);
        --btn-color-border: var(--brand-color-gray-ash);
      }
    }

    &#{$self}--dark {
      --btn-color-bg: transparent;
      --btn-color: #fff;
      --btn-color-border: #fff;

      &:hover,
      &#{$self}--fake-hover {
        --btn-color-bg: var(--brand-color-anthracite-3);
      }

      &:disabled,
      &#{$self}--disabled {
        &,
        &:hover {
          --btn-color-bg: transparent;
          --btn-color: var(--brand-color-gray-cement);
          --btn-color-border: var(--brand-color-anthracite-3);
        }
      }
    }
  }

  &--tertiary {
    --btn-color-bg: transparent;
    --btn-color-border: transparent;
    --btn-color: var(--brand-color-anthracite);

    &:hover,
    &#{$self}--fake-hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
    }
    &:disabled,
    &#{$self}--disabled {
      --btn-color: var(--brand-color-gray-cement);
    }
    &#{$self}--dark {
      --btn-color: #fff;
      &:hover,
      &#{$self}--fake-hover {
        --btn-color-bg: var(--brand-color-anthracite-3);
      }
    }
  }

  &--quaternary {
    --btn-color-bg: #fff;
    --btn-color-border: #fff;
    --btn-color: var(--brand-color-anthracite);

    &:hover,
    &#{$self}--fake-hover {
      --btn-color-border: var(--brand-color-gray-chalk);
      --btn-color-bg: var(--brand-color-gray-chalk);
    }
  }

  &--active {
    transition: 0.4s ease grid-template-columns;
    --loader-size: 1.5rem;
    --loader-gap: 1rem;
    #{$self}__loading {
      display: inline-block;
      width: var(--loader-size);
      height: var(--loader-size);
      // position: absolute;
      right: 1.8rem;
      // top: 50%;
      // transform: translate3d(0, -50%, 0);
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 0.2rem solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: ring 1s linear infinite;
      }
      @keyframes ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
