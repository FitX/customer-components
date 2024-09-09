
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
      getModifierClasses('link', [props.size, props.modifier]),
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
  --_fitx-link-color-hover: var(--fitx-link-color-hover, var(--brand-color-orange-2));

  --link-color: var(--_fitx-link-color);
  --link-color-hover: var(--_fitx-link-color-hover);

  &:is(&--secondary) {
    --_link-color: var(--fitx-link-color-secondary, inherit);
  }
}
</style>
