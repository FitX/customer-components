
<script lang="ts" setup>
import type { FitxLinkProps } from '@/components/fitx-link/types';
import { GymxLink } from '@fitx/gymx-ui';
import { getModifierClasses } from '@/utils/css-modifier';

const props = withDefaults(defineProps<FitxLinkProps>(), {
  modifier: 'primary',
})
</script>
<template>
  <gymx-link
    class="link"
    :class="[
      getModifierClasses('link', props.modifier),
    ]"
    :state="props.state"
    :tag="props.tag">
    <template #icon-start>
      <slot name="icon-start"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #icon-end>
      <slot name="icon-end">
      </slot>
    </template>
  </gymx-link>
</template>
<style lang="scss" scoped>
.link {
  --_fitx-link-color: var(--fitx-link-color, var(--brand-color-orange-0));
  --_fitx-link-color-hover: var(--fitx-link-color-hover, var(--brand-color-orange-1));

  --_fitx-link-color-secondary: var(--fitx-link-color-secondary, var(--brand-color-anthracite-1));
  --_fitx-link-color-secondary-hover: var(--fitx-link-color-secondary-hover, var(--brand-color-gray-carbon));

  --_fitx-link-icon-size: var(--fitx-link-icon-size, 18px);
  --_fitx-link-gap: var(--fitx-link-gap, 2px);
  --icon-fill: var(--fitx-link-icon-fill, currentColor);

  --link-color: var(--_fitx-link-color);
  --link-color-hover: var(--_fitx-link-color-hover);

  --link-icon-size-start: var(--_fitx-link-icon-size);
  --link-icon-size-end: var(--_fitx-link-icon-size);
  --link-gap: var(--_fitx-link-gap);

  &:is(&--secondary) {
    --link-color: var(--_fitx-link-color-secondary);
    --link-color-hover: var(--_fitx-link-color-secondary-hover);
  }
}
</style>
