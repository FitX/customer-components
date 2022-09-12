<template>
  <div
    :class="[ getModifierClasses('notification', modifier), { 'btn--dark' : isDarkMode } ]"
    class="notification">
    <div class="notification__content">
      <span
        class="notification__icon">
        <!--
          @slot Icon Slot
        -->
        <slot name="icon">
          <icon-error v-if="showErrorIcon" />
          <icon-success v-if="showSuccessIcon" />
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
import IconSuccess from '@/assets/icons/icon-checkmark.svg';
import IconError from '@/assets/icons/icon-error.svg';

export const modifier = [
  'error',
  'success',
];

export default {
  name: 'BannerNotification',
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
    IconSuccess,
    IconError,
  },
  setup(props) {
    const { getModifierClasses } = useModifier();
    const showErrorIcon = validateValueWithList(props.modifier, ['error']);
    const showSuccessIcon = validateValueWithList(props.modifier, ['success']);
    return {
      getModifierClasses,
      showErrorIcon,
      showSuccessIcon,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.notification {
  $self: &;
  --notification-border-radius: 0.6rem;
  --notification-spacing-h: 1.7rem;
  --notification-spacing-v: 1.4rem;
  --notification-icon-size: 1.8rem;
  --notification-icon-fill: var(--brand-color-orange);
  --notification-background: var(--brand-color-white);
  --notification-color: var(--brand-color-anthracite);
  background: var(--notification-background);
  color: var(--notification-color);
  border-radius: var(--notification-border-radius);
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 2.1rem;
  padding: var(--notification-spacing-v) var(--notification-spacing-h);
  display: inline-grid;
  grid-template-columns: 1fr;
  place-items: start;

  &--error {
    --notification-background: var(--functional-color-error);
    --notification-icon-fill: var(--brand-color-white);
    --notification-color: var(--brand-color-white);
  }

  &--success {
    --notification-background: var(--functional-color-success);
    --notification-icon-fill: var(--brand-color-white);
    --notification-color: var(--brand-color-white);
  }

  &__content {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--notification-spacing-h);
  }

  &__icon {
    --icon-fill: var(--notification-icon-fill);
    --icon-width: var(--notification-icon-size);
    --icon-height: var(--notification-icon-size);
    line-height: 0;
    // extra designer spacing -.- dont scale at all
    margin-top: 1px;
    &:empty {
      display: none;
    }
  }
}
</style>
