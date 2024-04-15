<template>
  <div
    :class="[ getModifierClasses('info-box', modifier), { 'btn--dark' : isDarkMode } ]"
    class="info-box">
    <div
      v-if="!hideIcon"
      class="info-box__icon">
      <!--
        @slot Icon Slot
      -->
      <slot name="icon">
        <icon-info />
      </slot>
    </div>
    <div class="info-box__content">
      <!--
        @slot Default Content Slot
      -->
      <slot>
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import IconInfo from '@/assets/icons/icon-info.svg';

export const modifier = [
  'no-icon',
];

export default {
  name: 'InfoBox',
  props: {
    /**
     * Default Slot Content Alternative
     */
    content: {
      type: String,
      default: null,
    },
    /**
     * Option to render in Dark Mode (Currently no explicit Styles)
     */
    isDarkMode: {
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
  components: {
    IconInfo,
  },
  setup(props) {
    const { getModifierClasses } = useModifier();
    /**
     * Check if no-icon modifier is selected
     * @type {boolean|*}
     */
    const hideIcon = validateValueWithList(props.modifier, ['no-icon']);
    return {
      getModifierClasses,
      hideIcon,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.info-box {
  $self: &;
  --info-box-spacing-h: 1.063rem;
  --info-box-spacing-v: 0.875rem;
  --info-box-icon-size: 1.125rem;
  --info-box-icon-fill: var(--brand-color-orange);
  background: var(--brand-color-orange-3);
  color: var(--carbon-color);
  font-size: 1rem;
  line-height: 1.313rem;
  border-radius: 6px;
  font-weight: 300;
  padding: var(--info-box-spacing-v) var(--info-box-spacing-h);
  display: inline-grid;
  grid-template-columns: var(--info-box-icon-size) 1fr;
  gap: var(--info-box-spacing-v);
  border-top: 5px solid var(--brand-color-orange);

  &--no-icon {
    grid-template-columns: 1fr;
    #{&}__icon {
      display: none;
    }
  }

  &__icon {
    --icon-fill: var(--info-box-icon-fill);
  }
}
</style>
