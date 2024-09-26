<script lang="ts" setup>
import { GymxErrorMessage } from '@fitx/gymx-ui';
import type { FitxErrorMessageProps } from '@/components';

const props = defineProps<FitxErrorMessageProps>();
</script>
<template>
  <gymx-error-message
    class="error-message"
    :text="props.text" />
</template>
<style scoped lang="scss">
.error-message {
  --error-message-color: var(--color-error-text);
  --error-message-font-size: var(--font-size-0);
  --error-message-icon-size: var(--icon-size-px-medium);
  --error-message-gap: var(--fitx-size-tiny);
  --icon-fill: var(--gymx-color-error-text);
}
</style>
