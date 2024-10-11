
<script lang="ts" setup>
import { computed } from 'vue';
import { GymxToast } from '@fitx/gymx-ui';
import type { FitxToastProps } from '@/components/fitx-toast/types';
import { IconError, IconCheckmark } from '@/components';

const props = withDefaults(defineProps<FitxToastProps>(), {
  type: 'success',
  closeText: 'Benachrichtigung Schließen',
});

const icon = computed(() => props.type === 'success' ? IconCheckmark : IconError);
</script>
<template>
  <gymx-toast
    v-bind="props"
    :icon="icon"
    id="toast" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/shared/mixins' as mixins;
.toast {
  --toast-padding-inline: var(--fitx-size-small);
  --toast-padding-block: var(--fitx-size-small);
  --toast-radius: var(--fitx-radius-3);
  --toast-icon-fill: currentColor;
  --toast-icon-gap: 1rem;

  --toast-color-success:
    var(--brand-color-white-0);
  --toast-color-background-success:
    var(--functional-color-success-0);


  --toast-color-error:
    var(--primary-brand-color-white);
  --toast-color-background-error:
    var(--functional-color-error-0);

  font-size: var(--font-size-2);

  /**
  Hide the close button if toast oder close button is not hovered or focused
   */
  &:not(:hover, :focus):deep(.toast__btn-close:not(:focus):not(:active)) {
    @include mixins.sr-only();
  }
}
</style>
