<template>
  <ol
    class="progress"
    :style="[
      { '--current-step': currentStepIndex },
      { '--steps-length': stepsWithLimits.length },
    ]"
    :class="$attrs.class">
    <li
      v-for="(step, index) in stepsWithLimits"
      :key="index"
      @click="selectStep(index)"
      class="progress__item"
      :class="[
          { 'progress__item--active' : isActive(index) },
          { 'progress__item--done' : isDone(index) },
          { 'progress__item--backward' : stepBackAnimation(index) },
          { 'progress__item--active-backward' : (isActive(index) && direction === 'BACKWARD') },
        ]"
    >
      <icon-checkmark
        class="progress__icon"
        v-if="true || isDone(index)" />
      <!--<span
        class="progress__count"
        v-else>{{ index }}</span>-->
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
  watch,
  ref, computed,
} from 'vue';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import IconCheckmark from '@/assets/icons/icon-checkmark.svg';

export const modifier = [
];

/**
 * Folds a String by Limit
 * @param {string} input - String to limit
 * @param {number} limit - Line after split
 * @param {array} arrayOfLimitedSplits - optional Array
 * @return {*[]|*}
 */
function fold(input, limit, arrayOfLimitedSplits) {
  arrayOfLimitedSplits = arrayOfLimitedSplits || [];
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
      required: true,
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
    /**
     * Component Modifier
     */
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
  },
  components: {
    IconCheckmark,
  },
  emits: {
    /**
     * Get Target Index of Progress Step
     */
    'step-selected': Number,
  },
  setup(props, { emit }) {
    const { getModifierClasses } = useModifier();
    /**
     * Step Direction
     * @type {Ref<UnwrapRef<'FORWARD'|'BACKWARD'>>}
     */
    const direction = ref('FORWARD');
    watch(() => props.currentStepIndex, (newVal, oldVal) => {
      direction.value = (newVal > oldVal) ? 'FORWARD' : 'BACKWARD';
    });
    const isActive = (stepIndex) => (props.currentStepIndex === stepIndex);
    const stepBackAnimation = (stepIndex) => (
      props.currentStepIndex + 1 === stepIndex && direction.value === 'BACKWARD'
    );
    const isDone = (stepIndex) => (stepIndex < props.currentStepIndex);
    /* const stepsWithLimits = computed(() => props.steps.map((step) => {
      const arrayOfLines = fold(step, props.characterLimit);
      console.log('arrayOfLines', arrayOfLines);
      return arrayOfLines.join('<br />')
    })); */
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
      direction,
      stepBackAnimation,
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
  --progress-step-animation-time: 0.1s;
  --progress-item-size: 3.6rem;
  --progress-font-size: 1.4rem;
  --progress-step-font-size: 1.6rem;
  --progress-step-indicator: 0.2rem;
  // --current-step-width: calc((var(--current-step) / (var(--steps-length) - 1)) * 100%);
  --current-step-width: calc(((var(--current-step) + 0.5) / var(--steps-length)) * 100%);
  /* --progress-color-outline: var(--brand-color-gray-cement);
  --progress-color-bg: transparent;
  --progress-color-step: var(--brand-color-gray-cement);
  --progress-color-stepname: var(--brand-color-gray-cement); */

  --progress-color-inactive: var(--brand-color-gray-cement);
  --progress-color-active: var(--brand-color-anthracite);
  --progress-color-done: var(--functional-color-success);
  --progress-color-container-bg: #fff;
  --progress-color-bg: #fff;
  --progress-color-title: var(--progress-color-inactive);
  --progress-color-count: var(--progress-color-inactive);
  --progress-color-border: var(--progress-color-inactive);
  --progress-step-space: 0.4rem;
  background-image: linear-gradient(
      to right,
      var(--progress-color-done) 50%,
      var(--progress-color-inactive) 50%
  );
  background-position-x: calc(100% - var(--current-step-width));
  background-position-y: calc((var(--progress-item-size) / 2) - (var(--progress-step-indicator) / 2));
  background-size: 200% var(--progress-step-indicator);
  background-repeat: no-repeat;
  display: grid;
  // grid-template-columns: repeat(var(--steps-length), 1fr);
  grid-template-columns: repeat(auto-fill, calc(100% / var(--steps-length)));
  justify-content: space-between;
  border: 1px solid red;
  counter-reset: progress-item;
  position: relative;
  transition: background var(--progress-animation-time) ease-in;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    /* width: calc(25% / 2);
    padding: 0;
    margin: 0;
    height: var(--progress-item-size);
    background: var(--progress-color-container-bg); */
    width: 100%;
    height: var(--progress-item-size);
    // add gradient over first and last item line, center is transparent
    background-image: linear-gradient(
        to right,
        // var(--progress-color-container-bg) 12.5%, // 25% / 2 first item
        var(--progress-color-container-bg) calc((100% / var(--steps-length)) / 2), // e.g. 100% / 4 steps = 25% / 2 first item
        transparent calc((100% / var(--steps-length)) / 2),
        transparent calc(100% - (100% / var(--steps-length)) / 2),
        var(--progress-color-container-bg) calc(100% - (100% / var(--steps-length)) / 2) // 100% - 1 step / half step width
      // transparent 87.5%,
        // var(--progress-color-container-bg) 87.5% // 75% + 25 / 2 last item
    );
  }

  &__icon {
    opacity: 0;
    transition: opacity var(--progress-step-animation-time) ease-in var(--progress-animation-time);
  }

  &__item {
    text-align: center;
    position: relative;
    color: var(--progress-color-title);
    display: grid;
    justify-items: center;
    align-content: start;
    width: 100%;
    border: 1px solid blue;
    cursor: pointer;
    transition: color var(--progress-step-animation-time) ease-in var(--progress-animation-time);
    // align-items: center;
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
      transition: all var(--progress-step-animation-time) ease-in var(--progress-animation-time);
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
    font-weight: 400;
    margin-top: var(--progress-step-space);
    font-size: var(--progress-font-size);
    word-break: break-word;
  }
}

.progressi {
  @include list-unstyled();
  $self: &;
  --progress-item-size: 3.6rem;
  --progress-font-size: 1.4rem;
  --progress-step-font-size: 1.6rem;
  /* --progress-color-outline: var(--brand-color-gray-cement);
  --progress-color-bg: transparent;
  --progress-color-step: var(--brand-color-gray-cement);
  --progress-color-stepname: var(--brand-color-gray-cement); */

  --progress-color-inactive: var(--brand-color-gray-cement);
  --progress-color-active: var(--brand-color-anthracite);
  --progress-color-done: var(--functional-color-success);
  --color: #fff;
  user-select: none;
  display: flex;
  text-align: center;
  margin: 0;
  padding: 0;
  &__item {
    flex: 1 0 0;
    padding: .1em;
    position: relative;
    color: var(--color);
    border: 1px solid red;
    background-image: linear-gradient(
        to right,
        var(--progress-color-done) 50%,
        var(--progress-color-inactive) 50%
    );
    background-position-x: 100%;
    background-position-y: calc(50% - (2px / 2));
    background-size: 200% 2px;
    background-repeat: no-repeat;
    list-style-position: inside;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    &--done {
      background-position-x: 0;

      &::after {
        display: inline-block;
        content: '';
        width: .375rem;
        height: .6875rem;
        border: solid currentColor;
        border-width: 0 .0625rem .0625rem 0;
        position: absolute;
        transform: translate(.6em, .2em) rotate(45deg);
      }
    }
    &--active {
      animation-name: slide-in-from-left;
    }
    &--active-backward {
      background-position-x: 0;
    }
    &--backward {
      animation-name: slide-out-from-right;
    }
  }
}
</style>
