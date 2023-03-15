<template>
  <span
    class="badge"
    :class="[ `badge--status-${status || 1}`, { 'badge--dark': isDarkMode } ]">
    <!--
      @slot Default Content Slot
    -->
    <slot>{{ value }}</slot></span>
</template>

<script>
export default {
  name: 'FitxBadge',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: null,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
// @use currently only with dart-sass
// @use '~@/assets/styles/badge.scss' as badge;
@import '~@/assets/styles/badge.scss';
.badge {
  @include badge-styles();
}
</style>
