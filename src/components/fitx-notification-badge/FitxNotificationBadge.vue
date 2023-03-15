<template>
  <span
    class="notification-badge"
    :class="[
      `notification-badge--status-${status || 1}`,
      { 'notification-badge--dark': isDarkMode } ]">
      <span>
        <!--
          @slot Default Content Slot
        -->
        <slot>{{ value }}</slot>
      </span>
    </span>
</template>

<script>
export default {
  name: 'FitxNotificationBadge',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: null,
    },
    status: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<style lang="scss" scoped>
// @use currently only with dart-sass
// @use '~@/assets/styles/badge.scss' as badge;
@import '~@/assets/styles/badge.scss';
.notification-badge {
  @include badge-styles();
  --notification-badge-size: 32px;
  --badge-spacing-h: 0;
  --badge-spacing-v: 0;
  --badge-border-radius: var(--notification-badge-size);
  --badge-font-size: 1.25rem;
  width: var(--notification-badge-size);
  height: var(--notification-badge-size);
  display: inline-grid;
  text-align: center;
  place-content: center;
}
</style>
