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
.badge {
  $self: &;
  --badge-color: var(--brand-color-white);
  --badge-color-bg: var(--brand-color-anthracite);
  --badge-spacing-h: 1rem;
  --badge-spacing-v: 0.25rem;
  --badge-border-radius: 4px;

  display: inline;
  background: var(--badge-color-bg);
  color: var(--badge-color);
  padding: var(--badge-spacing-v) var(--badge-spacing-h);
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  border-radius: var(--badge-border-radius);

  &--status {
    &-1 {
      &#{$self}--dark {
        --badge-color: var(--brand-color-anthracite);
        --badge-color-bg: var(--brand-color-white-2);
      }
    }
    &-2 {
      --badge-color-bg: var(--brand-color-orange);
    }
    &-3 {
      --badge-color-bg: var(--functional-color-success);
    }
    &-4 {
      --badge-color-bg: var(--brand-color-anthracite-6);
    }
  }
}
</style>
