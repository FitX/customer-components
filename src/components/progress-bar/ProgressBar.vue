<template>
  <ol
    class="progress"
    :style="[
      { '--progress-current-step-index': currentStepIndex },
      { '--progress-steps-length': stepsWithLimits.length },
    ]"
    :class="[
      getModifierClasses('progress', [
        isDarkMode ? 'dark' : null,
      ]),
    ]">
    <li
      v-for="(step, index) in stepsWithLimits"
      :key="index"
      @click="selectStep(index)"
      class="progress__item"
      :class="[
          { 'progress__item--active' : isActive(index) },
          { 'progress__item--done' : isDone(index) },
        ]"
    >
      <icon-checkmark
        aria-hidden="true"
        v-show="isDone(index)"
        class="progress__icon" />
      <span class="progress__title">
        <template
          v-for="(textParts, index) in step"
          :key="index">
          {{ textParts }}<br>
        </template>
      </span>
    </li>
  </ol>
</template>

<script>
import {
  computed,
} from 'vue';
import useModifier from '@/use/modifier-class';
import IconCheckmark from '@/assets/icons/icon-checkmark.svg';

/**
 * Folds a String by Limit
 * @param {string} input - String to limit
 * @param {number} limit - Line after split
 * @param {array} arrayOfSplits - optional Array
 * @return {*[]|*}
 */
function fold(input, limit, arrayOfSplits = []) {
  const arrayOfLimitedSplits = arrayOfSplits;
  if (input.length <= limit) {
    arrayOfLimitedSplits.push(input);
    return arrayOfLimitedSplits;
  }
  arrayOfLimitedSplits.push(input.substring(0, limit));
  const tail = input.substring(limit);
  return fold(tail, limit, arrayOfLimitedSplits);
}

export default {
  name: 'ProgressBar',
  props: {
    /**
     * Steps Array of Strings
     */
    steps: {
      type: Array,
      default: () => [],
    },
    /**
     * Index in Steps
     */
    currentStepIndex: {
      type: Number,
      default: 1,
    },
    /**
     * Max Step Name Length before break
     */
    characterLimit: {
      type: Number,
      default: 18,
    },
    /**
     * Option to render in Dark Mode (Currently no explicit Styles)
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconCheckmark,
  },
  emits: {
    /**
     * Get Target Index of Progress Step Array
     */
    'step-selected': Number,
  },
  setup(props, { emit }) {
    const { getModifierClasses } = useModifier();
    const isActive = (stepIndex) => (props.currentStepIndex === stepIndex);
    const isDone = (stepIndex) => (stepIndex < props.currentStepIndex);
    /**
     * Limit max Length of Step Names and split them to Array
     * @type {ComputedRef<(*[]|*)[]>}
     */
    const stepsWithLimits = computed(() => props.steps
      .map((step) => fold(step, props.characterLimit)));
    const selectStep = (index) => emit('step-selected', index);
    return {
      isActive,
      isDone,
      getModifierClasses,
      stepsWithLimits,
      selectStep,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';

.progress {
  @include list-unstyled();
  $self: &;
  --progress-animation-time: 0.3s;
  --progress-step-animation-time: 0.3s;
  --progress-item-size: 3.6rem;
  --progress-font-size: 1.4rem;
  --progress-step-font-size: 1.6rem;
  --progress-step-indicator: 0.2rem;
  --progress-current-step-width: calc(
    ((var(--progress-current-step-index) + 0.5) / var(--progress-steps-length)) * 100%);
  --progress-item-width: calc(100% / var(--progress-steps-length));

  --progress-color-inactive: var(--brand-color-gray-cement);
  --progress-color-active: var(--brand-color-anthracite);
  --progress-color-done: var(--functional-color-success);
  --progress-color-container-bg: #fff;
  --progress-color-bg: #fff;
  --progress-color-title: var(--progress-color-inactive);
  --progress-color-count: var(--progress-color-inactive);
  --progress-color-border: var(--progress-color-inactive);
  --progress-step-space: 0.4rem;
  --progress-helper-overlay-start-end: calc(
    (100% / var(--progress-steps-length)) / 2); // e.g. 100% / 4 steps = 25% / 2 first item
  --progress-helper-overlay-end-start: calc(
    100% - (100% / var(--progress-steps-length)) / 2); // 100% - 1 step / half step width
  &--dark {
    --progress-color-active: #fff;
    --progress-color-container-bg: var(--brand-color-anthracite);
    --progress-color-bg: var(--brand-color-anthracite);
  }
  /**
  Progress Bar, half/half Background of 200% Width of the progress bar
  To animate inactive color to done color
   */
  background-image: linear-gradient(
      to right,
      var(--progress-color-done) 50%,
      var(--progress-color-inactive) 50%
  );
  background-position-x: calc(100% - var(--progress-current-step-width));
  background-position-y: calc(
    (var(--progress-item-size) / 2) - (var(--progress-step-indicator) / 2));
  background-size: 200% var(--progress-step-indicator);
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--progress-item-width));
  justify-content: space-between;
  counter-reset: progress-item;
  position: relative;
  transition: background var(--progress-animation-time) ease;
  user-select: none;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--progress-item-size);
    // add gradient over first and last item line, center is transparent
    background-image: linear-gradient(
        to right,
        var(--progress-color-container-bg) var(--progress-helper-overlay-start-end),
        transparent var(--progress-helper-overlay-start-end),
        transparent var(--progress-helper-overlay-end-start),
        var(--progress-color-container-bg) var(--progress-helper-overlay-end-start)
    );
  }

  &__icon {
    // opacity: 0;
    // transition: opacity var(--progress-step-animation-time) ease;
  }

  &__item {
    text-align: center;
    position: relative;
    color: var(--progress-color-title);
    display: grid;
    justify-items: center;
    align-content: start;
    width: 100%;
    cursor: pointer;
    transition: color var(--progress-step-animation-time) ease-in;
    &::before {
      counter-increment: progress-item;
      content: counter(progress-item);
      display: grid;
      place-items: center;
      text-align: center;
      font-weight: 300;
      border-radius: var(--progress-item-size);
      width: var(--progress-item-size);
      height: var(--progress-item-size);
      font-size: var(--progress-step-font-size);
      outline: var(--progress-step-space) solid var(--progress-color-container-bg);
      background: var(--progress-color-bg);
      border: 1px solid var(--progress-color-border);
      color: var(--progress-color-count);
      transition: all var(--progress-step-animation-time) ease-in;
    }
    &:first-child {
      justify-self: start;
    }
    &:last-child {
      justify-self: end;
    }
    &--done {
      --progress-color-border: var(--progress-color-done);
      --progress-color-bg: var(--progress-color-done);
      --progress-color-title: var(--progress-color-done);
      --progress-color-count: transparent;
      & #{$self}__icon {
        opacity: 1;
      }
    }
    &--active {
      --progress-color-border: var(--progress-color-active);
      --progress-color-bg: var(--progress-color-active);
      --progress-color-title: var(--progress-color-active);
      --progress-color-count: #fff;
      #{$self}--dark & {
        --progress-color-count: var(--brand-color-anthracite);
      }
    }
  }

  &__icon {
    --icon-width: 2.2rem;
    --icon-height: 2.2rem;
    --icon-fill: #fff;
    top: 0.7rem;
    position: absolute;
  }

  &__title {
    font-weight: 300;
    margin-top: var(--progress-step-space);
    font-size: var(--progress-font-size);
    word-break: break-word;

    #{$self}__item--done & {
      font-weight: 400;
    }
  }
}
</style>
