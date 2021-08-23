<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="[ getModifierClasses('btn', modifier) ]"
    class="btn">
    <slot>
      {{ text }}
    </slot>
    <span class="btn__loading" />
  </component>
</template>

<script>
import useModifier from '@/use/modifier-class';

export const modifier = [
  'secondary',
  'tertiary',
  'disabled',
];

export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    text: {
      type: String,
      default: null,
    },
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => {
        if (typeof value === 'object') {
          const filtered = modifier.filter((mod) => value.includes(mod));
          return filtered.length > 0;
        }
        return modifier.includes(value);
      },
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
  --loader-size: 1.5rem;
  position: relative;
  width: 28rem;
  max-width: 100%;
  font-size: 1.8rem;
  font-weight: 400;
  background: var(--btn-color-bg);
  color: var(--btn-color);
  padding: 1.6rem;
  border: 2px solid var(--btn-color-border);
  border-radius: 2.6rem;
  cursor: pointer;
  text-align: center;
  &:hover {
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
  }

  &--secondary {
    --btn-color-bg: transparent;
    --btn-color-border: var(--brand-color-anthracite);
    --btn-color: var(--brand-color-anthracite);

    &:hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
    }
    &:disabled,
    &#{$self}--disabled {
      --btn-color: var(--brand-color-gray-cement);
      --btn-color-border: var(--brand-color-gray-ash);
    }
  }

  &--tertiary {
    --btn-color-bg: transparent;
    --btn-color-border: transparent;
    --btn-color: var(--brand-color-anthracite);

    &:hover {
      --btn-color-bg: var(--brand-color-gray-chalk);
    }
    &:disabled,
    &#{$self}--disabled {
      --btn-color: var(--brand-color-gray-cement);
    }
  }

  &:active #{&}__loading {
    display: inline-block;
    width: var(--loader-size);
    height: var(--loader-size);
    position: absolute;
    right: 1.8rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
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
</style>
