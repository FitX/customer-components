<script lang="ts" setup>
import { IconExclamationmark } from '@/components/icons';
import type { FitxErrorMessageProps } from '@/components/fitx-error-message/types';

const props = defineProps<FitxErrorMessageProps>();
</script>
<template>
  <span class="error-message">
    <icon-exclamationmark class="error-message__icon" />
    <span>
      {{ props.text }}
    </span>
  </span>
</template>

<style lang="scss" scoped>
.error-message {
  --_error-message-font-size: var(--error-message-font-size, 0.875rem);
  --_error-message-color: var(--error-message-color, var(--functional-color-error-0));
  --_error-message-gap: var(--error-message-gap, var(--size-1));
  --_error-message-icon-size: var(--error-message-icon-size, var(--icon-size-px-mini));

  font-size: var(--_error-message-font-size);
  font-weight: 400;
  display: grid;
  width: 100%;
  color: var(--_error-message-color);
  grid-template-columns: var(--_error-message-icon-size) 1fr;
  grid-gap: var(--_error-message-gap);
  align-items: center;

  &__icon {
    --icon-width: var(--_error-message-icon-size);
    --icon-fill: currentColor;
    aspect-ratio: 1;
  }
}
</style>
