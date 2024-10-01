
<script lang="ts" setup>
import { GymxBadge } from '@fitx/gymx-ui';
import type { FitxBadgeProps } from '@/components/fitx-badge/types';
import { getModifierClasses } from '@/utils/css-modifier';
const props = defineProps<FitxBadgeProps>();
</script>
<template>
  <gymx-badge class="badge" :class="getModifierClasses('badge', props.isRound ? 'round' : undefined)">
    <template #default>
      <slot name="default">
        {{ props.text }}
      </slot>
      <component v-if="props.icon" :is="props.icon"></component>
    </template>
  </gymx-badge>
</template>
<style lang="scss" scoped>
.badge {
  --badge-font-size: var(--fitx-badge-font-size, 1rem);
  --badge-color-background: var(--fitx-badge-color-background, light-dark(var(--brand-color-anthracite-0), var(--brand-color-white-0)));
  --badge-color-text: var(--fitx-badge-color-text, light-dark(var(--brand-color-white-0), var(--brand-color-anthracite-0)));
  --badge-radius: var(--fitx-badge-radius, var(--fitx-radius-2));
  --badge-padding-inline: var(--fitx-badge-padding-inline, var(--fitx-size-small));
  --badge-padding-block: var(--fitx-badge-padding-block, var(--fitx-size-micro));

  --badge-icon-gap: var(--fitx-badge-icon-gap, var(--fitx-size-micro));
  --icon-fill: var(--badge-color-text);

  display: inline-flex;
  place-items: center;
  gap: var(--badge-icon-gap);

  &--round {
    --badge-radius: calc(infinity * 1px);
    --badge-padding-inline: 0;
    --badge-padding-block: 0;
    width: 2rem;
    aspect-ratio: 1;
  }
}
</style>
