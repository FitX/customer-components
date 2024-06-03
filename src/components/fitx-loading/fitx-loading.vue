<script lang="ts">
import type { Theme } from '@/types';

export interface FitXLoadingProps {
  theme?: Theme;
  isActive?: boolean;
  description?: string;
  /**
   * true = visible;
   * false = for for Screenreader only;
   */
  showDescription?: boolean;
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
  showDescription: false,
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
      class="loading__label"
      :class="{ 'visually-hidden': !props.showDescription }">
      {{ description }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  --_loading-animation-duration: var(--loading-animation-duration, 1s);
  --_loading-block-size: var(--loading-block-size, var(--size-px-3));
  --_loading-font-size: var(--loading-font-size, calc(var(--_loading-block-size) / 1.5));
  --_loading-radius: var(--loading-radius, var(--radius-px-2));
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
  --_loading-color-light: var(--loading-color-light, var(--brand-color-anthracite-0));
  --_loading-color-dark: var(--loading-color-dark, var(--brand-color-white-0));
  --_loading-color: var(--loading-color-light);

  &:is([data-theme='dark']) {
    --_loading-surface: var(--_loading-surface-dark);
    --_loading-color: var(--_loading-color-dark);
  }

  display: grid;
  align-items: center;
  block-size: var(--_loading-block-size);
  border-radius: var(--_loading-radius);
  font-size: var(--_loading-font-size);
  color: var(--_loading-color);

  &__label {
    padding-inline-start: var(--_loading-font-size);
  }

  &--is-loading {
    animation: loadingBarAnimation var(--_loading-animation-duration) ease-in infinite forwards;
    background: var(--_loading-surface);
    background-repeat: no-repeat;
    background-position: center;
    background-size:
      var(--_loading-indicator-inline-size) 300%,
      100% 100%;
  }
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
