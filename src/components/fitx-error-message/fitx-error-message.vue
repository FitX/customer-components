<script lang="ts">
import type { Theme } from '@/types';
export type messageState = 'errorMessage' | 'supportingText';
export type FitxErrorMessageProps = {
  text?: string;
  theme?: Theme;
  modifier?: messageState;
  showIcon?: boolean;
}
</script>

<script lang="ts" setup>
import { computed, toValue, useSlots } from 'vue';
import { IconExclamationmark, IconInfo } from '@/components/icons';


const props = withDefaults(
  defineProps<FitxErrorMessageProps>(),
  {
    text: 'error',
    modifier: 'errorMessage',
    showIcon: true,
  },
);

const errorIcon = computed(() => props.modifier === 'errorMessage' ? IconExclamationmark : IconInfo);
const errorTextClass = computed(() => props.modifier === 'errorMessage' ?  'error-message--error' : 'error-message--support');

</script>
<template>
  <span class="error-message" :class="{'error-message--no-icon': !showIcon}">
    <component v-if="showIcon" :is="errorIcon" class="error-message__icon" />
    <span :class="errorTextClass">
      {{ text }}
    </span>
  </span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as normalize;

.error-message {
  font-size: 0.875rem;
  font-weight: 300;
  display: grid;
  width: 100%;
  grid-template-columns: 1.25rem 1fr;
  grid-gap: 0.25rem;
  align-items: center;

  &--no-icon {
    grid-template-columns: none;
  }

  &--error {
    color: var(--functional-color-error-0);
  }

  &--support {
    color: var(--brand-color-gray-carbon);
  }

  &__icon {
    --icon-size: 1.125rem;
    --icon-width: var(--icon-size);
    --icon-height: var(--icon-size);
    --icon-fill: var(--functional-color-error);
  }
}
</style>
