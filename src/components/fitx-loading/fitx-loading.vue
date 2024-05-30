<script lang="ts">
import type { Theme } from '@/types';

export interface FitXLoadingProps {
  theme?: Theme;
  isActive?: boolean; // default true
  /**
   * For Screenreader only
   */
  description?: string;
  /**
   * css animation direction
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
   */
  animationDirection?: 'normal' | 'reverse' | 'alternate';
}
</script>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';

const props = withDefaults(defineProps<FitXLoadingProps>(), {
  isActive: true,
  description: 'wird geladen',
  animationDirection: 'normal',
});

const attrs = useAttrs();
const componentId = computed(() => attrs?.id?.toString() || crypto.randomUUID());

const componentClasses = computed(() => [
  'loading',
  ...getModifierClasses('loading', props.isActive ? 'is-loading' : []),
]);
</script>

<template>
  <div
    data-loading
    :data-theme="props.theme"
    ref="loading"
    :class="componentClasses"
    aria-atomic="true"
    :aria-labelledby="componentId"
    aria-live="assertive"
    role="progressbar"
    :aria-busy="props.isActive"
    :style="{ 'animation-direction': props.animationDirection }">
    <label
      :id="componentId"
      class="visually-hidden">
      {{ description }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  --_loading-animation-duration: var(--loading-animation-duration, 1s);
  --_loading-block-size: var(--loading-block-size, var(--size-px-3));
  --_loading-border-size: var(--loading-radius, var(--radius-px-2));
  --_loading-surface-light: var(
    --loading-surface-light,
    radial-gradient(
      var(--brand-color-orange-0) 5%,
      var(--brand-color-orange-2) 30%,
      transparent 40%
    ),
    var(--brand-color-gray-ash)
  );
  --_loading-surface-dark: var(
    --loading-surface-dark,
    radial-gradient(
      var(--brand-color-orange-1) 5%,
      var(--brand-color-orange-0) 30%,
      transparent 40%
    ),
    var(--brand-color-anthracite-3)
  );
  --_loading-indicator-inline-size: var(--loading-indicator-inline-size, 37.5rem);
  --_loading-surface: var(--_loading-surface-light);

  &:is([data-theme='dark']) {
    --_loading-surface: var(--_loading-surface-dark);
  }

  block-size: var(--_loading-block-size);
  border-radius: var(--_loading-border-size);

  animation: loadingBarAnimation var(--_loading-animation-duration) ease-in infinite forwards;

  background: var(--_loading-surface);
  background-repeat: no-repeat;
  background-position: center;
  background-size:
    var(--_loading-indicator-inline-size) 300%,
    100% 100%;
}

@keyframes loadingBarAnimation {
  0% {
    background-position-x: calc(var(--_loading-indicator-inline-size) * -1);
  }
  100% {
    background-position-x: calc(100% + var(--_loading-indicator-inline-size));
  }
}
</style>
