<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="[ getModifierClasses('btn', modifier) ]"
    class="btn">
    <span class="btn__icon">
      <slot name="icon" />
    </span>
    <span class="btn__text">
      <slot>
        {{ text }}
      </slot>
    </span>
  </component>
</template>

<script>
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

const modifier = [
  'disabled',
];

export default {
  name: 'TextButton',
  props: {
    tag: {
      type: String,
      default: 'a',
    },
    text: {
      type: String,
      default: null,
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
@import 'src/assets/styles/mixin-reset.scss';
.btn {
  @include btn-reset();
  --btn-color: #ED6A12;
  --icon-width: var(--icon-size, 2.6rem);
  cursor: pointer;
  display: inline-flex;
  width: auto;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  background: none;
  color: var(--btn-color);
  padding: 0;
  border: none;
  gap: 1rem;
  text-decoration: none;
  &__icon {
    line-height: 0;
    width: var(--icon-width);
    &:empty {
      display: none;
    }
  }
}
</style>
