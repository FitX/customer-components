
<script lang="ts" setup>
import { GymxDialog } from '@fitx/gymx-ui';
import type { FitxDialogProps, FitxDialogSlots } from './types';

const props = withDefaults(defineProps<FitxDialogProps>(), {
  isModal: true,
  closeOnOutside: true,
});

defineSlots<FitxDialogSlots>();

defineEmits(['update:modelValue', 'opened', 'closed']);
</script>
<template>
  <gymx-dialog v-bind="props" class="dialog">
    <template #header>
      <slot name="header" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </gymx-dialog>
</template>
<style lang="scss">
:root {
  --dialog-layer: 100;
  --dialog-inline-size: 60ch;
  --dialog-animation-duration: 0.5s;
  --dialog-animation-in: dialog-in-fx var(--dialog-animation-duration) ease-in-out forwards;
  --dialog-animation-out: dialog-out-fx var(--dialog-animation-duration) ease-in-out forwards;
  --dialog-inline-padding: var(--fitx-size-semi);
  --dialog-block-padding: var(--fitx-size-semi);
  --dialog-border-radius: var(--fitx-radius-5);
  --dialog-border: none;
  --dialog-shadow: none;
  --dialog-title-font-size: var(--font-size-5);
}
</style>
<style lang="scss" scoped>
.dialog {
  --icon-width: var(--font-size-5);
  --icon-height: var(--font-size-5);
  width: 70vw;
  &__header {
    color: var(--fitx-color-text);
    font-feature-settings: 'liga' off, 'clig' off;

    // font-size: var(--font-size-2);
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    letter-spacing: 0.25px;
  }

  &::backdrop {
    background-color: light-dark(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25));
  }

  :deep(.dialog__body), :deep(.dialog__footer) {
    padding-block-start: 0;
  }

  :deep(.dialog__footer) {
    display: flex;
    justify-content: end;
  }

  :deep(.dialog__button-close) {
    align-self: center;
  }

  @keyframes dialog-out-fx {
    to {
      opacity: 0;
    }
  }

  @keyframes dialog-in-fx {
    from {
      opacity: 1;
    }
  }
}
</style>
