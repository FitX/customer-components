<script lang="ts" setup>
import { type FitxBadgeProps } from './types';

const props = defineProps<FitxBadgeProps>();
</script>
<template>
  <span
    :data-theme="props.theme"
    class="badge">
    <slot>
      {{ props.text }}
    </slot>
  </span>
</template>

<style lang="scss" scoped>
.badge {
  --_badge-font-size: var(--badge-font-size, 1rem);
  --_badge-color-background: var(--badge-color-background-light, var(--brand-color-anthracite-0));
  --_badge-color-text: var(--badge-color-text-light, var(--brand-color-white-0));
  --_badge-radius: var(--badge-radius, var(--radius-2));
  --_badge-padding-inline: var(--badge-padding-inline, var(--size-3));
  --_badge-padding-block: var(--badge-padding-block, var(--size-1));

  display: inline-flex;
  place-items: center;
  place-content: center;
  font-size: var(--_badge-font-size);
  font-weight: 400;
  color: var(--_badge-color-text);
  text-transform: uppercase;
  padding-inline: var(--_badge-padding-inline);
  padding-block: var(--_badge-padding-block);
  background: var(--_badge-color-background);
  border-radius: var(--_badge-radius);

  &:is([data-theme='dark']) {
    --_badge-color-background: var(--badge-color-background-dark, var(--brand-color-white-0));
    --_badge-color-text: var(--badge-color-text-dark, var(--brand-color-anthracite-0));
  }
}
</style>
