<template>
  <button
    v-bind="$attrs"
    :class="[ getModifierClasses('btn', modifier), { 'btn--dark' : isDarkMode } ]"
    class="btn">
    <slot>
      {{ title }}
    </slot>
    <span class="btn__additional">
      <slot name="additional">
        {{ text }}
      </slot>
    </span>
  </button>
</template>

<script>
import useModifier from '@/use/modifier-class';

export const modifier = [
  'disabled',
  'active',
  'extra',
  'fake-hover',
];

export default {
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
  --btn-color-bg: #fff;
  --btn-color-border: var(--brand-color-gray-stone);
  --btn-color: var(--brand-color-anthracite);
  --btn-font-size: 1.8rem;
  --btn-padding: 3rem;
  --btn-border-width: 1px;

  height: 8rem;
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

  &--extra {
    --btn-padding: 1.8rem;
    display: grid;
    text-align: left;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
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

  &__additional {
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--brand-color-gray-steel);
  }

}
</style>
