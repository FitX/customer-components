<template>
  <div
    :class="[ getModifierClasses('base-banner', modifier), { 'btn--dark' : isDarkMode } ]"
    class="base-banner">
    <div class="base-banner__content">
      <span
        v-if="!hideIcon"
        class="base-banner__icon">
        <!--
          @slot Icon Slot
        -->
        <slot name="icon">
          <icon-info v-if="showAttentionIcon" />
        </slot>
      </span>
      <span>
        <!--
        @slot Default Content Slot
      -->
      <slot>
        {{ content }}
      </slot>
      </span>
    </div>
  </div>
</template>

<script>
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import IconInfo from '@/assets/icons/icon-info.svg';

export const modifier = [
  'no-icon',
  'attention',
  'left',
  'right',
];

export default {
  name: 'BaseBanner',
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
    const showAttentionIcon = validateValueWithList(props.modifier, ['attention']);
    return {
      getModifierClasses,
      hideIcon,
      showAttentionIcon,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.base-banner {
  $self: &;
  --base-banner-spacing-h: 1.7rem;
  --base-banner-spacing-v: 1.4rem;
  --base-banner-icon-size: 1.8rem;
  --base-banner-icon-fill: var(--brand-color-anthracite);
  --base-banner-background: var(--brand-color-white-1);
  --base-banner-color: var(--brand-color-anthracite);
  background: var(--base-banner-background);
  color: var(--base-banner-color);
  font-size: 1.6rem;
  line-height: 2.1rem;
  font-weight: 300;
  padding: var(--base-banner-spacing-v) var(--base-banner-spacing-h);
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  &--left {
    justify-items: start;
  }

  &--right {
    justify-items: end;
  }

  &--attention {
    --base-banner-background: var(--functional-color-attention-1-light);
    --base-banner-icon-fill: var(--brand-color-orange);
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--base-banner-spacing-h);
  }

  &__icon {
    --icon-fill: var(--base-banner-icon-fill);
    --icon-width: var(--base-banner-icon-size);
    --icon-height: var(--base-banner-icon-size);
    &:empty {
      display: none;
    }
  }
}
</style>
