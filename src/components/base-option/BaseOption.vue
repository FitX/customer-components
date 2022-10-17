<template>
  <button
    v-bind="$attrs"
    :class="[ getModifierClasses('btn', modifier), { 'btn--dark' : isDarkMode } ]"
    class="btn">
    <span class="btn__content">
      <slot>
        {{ title }}
      </slot>
      <span class="btn__additional">
        <slot name="additional">
          {{ text }}
        </slot>
      </span>
    </span>
  </button>
</template>

<script>
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

export const modifier = [
  'disabled',
  'active',
  'extra',
  'small',
  'fake-hover',
];

export default {
  name: 'BaseOption',
  props: {
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    isDarkMode: {
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
  --btn-color-bg: #fff;
  --btn-color-border: var(--brand-color-gray-stone);
  --btn-color: var(--brand-color-anthracite);
  --btn-font-size: 1.125rem;
  --btn-padding: 1.875rem;
  --btn-padding-h: var(--btn-padding);
  --btn-padding-v: 0;
  --btn-height: 5rem;
  --btn-border-width: 1px;

  height: var(--btn-height);
  font-size: var(--btn-font-size);
  font-weight: 400;
  background: var(--btn-color-bg);
  color: var(--btn-color);
  padding: var(--btn-padding-v) var(--btn-padding-h);
  border: var(--btn-border-width) solid var(--btn-color-border);
  border-radius: 8px;
  cursor: pointer;
  text-align: center;

  &--small {
    --btn-height: 6rem;
  }

  &:hover,
  &--fake-hover {
    --btn-color-bg: var(--brand-color-gray-chalk);
  }

  &--extra {
    --btn-padding-h: 1.125rem;
    #{$self}__content {
      display: grid;
      text-align: left;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
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

  &__additional {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--brand-color-gray-steel);
    #{$self}--dark & {
      color: var(--brand-color-gray-graphite);
    }
  }

}
</style>
