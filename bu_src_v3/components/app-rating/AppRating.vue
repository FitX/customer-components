<script>
import { computed, ref } from 'vue';
import { debouncedWatch } from '@vueuse/core';
import AnimationSatellite from './animation-satellite.vue';
import IconVote1 from '@/assets/icons/icon-vote-1.svg';
import IconVote2 from '@/assets/icons/icon-vote-2.svg';
import IconVote3 from '@/assets/icons/icon-vote-3.svg';
import IconVote4 from '@/assets/icons/icon-vote-4.svg';
import IconVote5 from '@/assets/icons/icon-vote-5.svg';
/**
 * Filter Even Elements
 * normally even numbers have the feature that number % 2 === 0;
 * JavaScript is, however, zero-based, so want those elements with a modulo of 1:
 */
export const filterEvenElement = (array = []) => array.filter((item, index) => index % 2 === 0);
const titles = [
  'nicht so gut',
  'naja',
  'ok',
  'gut',
  'sehr gut',
];
export default {
  name: 'AppRating',
  components: {
    AnimationSatellite,
    IconVote1,
    IconVote2,
    IconVote3,
    IconVote4,
    IconVote5,
  },
  emits: [
    /**
     * Fires on vote
     * @property {number} val - VoteCount
     */
    'success',
  ],
  props: {
    title: {
      type: String,
      default: null,
    },
    voted: {
      type: Number,
      default: null,
    },
    /**
     * Number of Voted. Possible values: 3 or 5
     */
    numberOfVotes: {
      type: Number,
      default: 5,
      validator: (value) => {
        const acceptedValues = [3, 5];
        return acceptedValues.includes(value);
      },
    },
  },
  setup(props, { emit }) {
    const vote = ref(props.voted);
    const components = ref([]);
    const startAnimation = ref(false);
    const animationDelay = ref(600);

    /**
     * set vote
     * @param {number} count
     */
    const saveVote = (count) => {
      vote.value = count;
      emit('success', count);
    };
    /**
     * Initi Components by numberOfVotes
     */
    const initComponents = () => {
      for (let count = 0; count < 5; count += 1) {
        const countNumber = (count + 1);
        // Runs 5 times, with values of step 0 through 4.
        components.value[count] = {
          index: countNumber,
          title: titles[count],
          component: `IconVote${countNumber}`,
        };
      }
    };

    const componentsByVoteCount = computed(() => {
      if (props.numberOfVotes === 3) {
        return filterEvenElement(components.value);
      }

      return components.value;
    });

    initComponents();
    debouncedWatch(vote, () => {
      startAnimation.value = true;
    }, {
      debounce: animationDelay.value,
    });

    return {
      vote,
      saveVote,
      componentsByVoteCount,
      startAnimation,
      animationDelay,
    };
  },
};
</script>
<template>
  <div
    class="rating"
    :style="{
      '--voting-icon-count': numberOfVotes,
      '--animation-delay': `${animationDelay}ms`,
    }">
    <p
      v-if="title"
      class="rating__title">{{ title }}</p>
    <div
      v-if="componentsByVoteCount"
      :style="{ '--voting-icon-count' : numberOfVotes }"
      class="rating__buttons">

      <button
        v-for="icon in componentsByVoteCount"
        :key="icon.index"
        :class="[
          { 'animation' : vote === icon.index },
          { 'vote--bye-bye' : vote && vote !== icon.index },
          `vote--${icon.index}`
        ]"
        :disabled="vote"
        class="vote"
        :data-test="`vote-${icon.index}`"
        :aria-label="`Bewerte mit ${icon.title}`"
        @click="saveVote(icon.index)">
        <component
          :is="icon.component"
          class="rating__icon"
        ></component>

        <animation-satellite
          data-test="animation-wrapper"
          v-if="vote === icon.index && startAnimation"
          :animation="true"></animation-satellite>
      </button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '@/assets/styles/mixin-reset.scss';

.rating {
  --icon-fill: var(--brand-color-anthracite);
  --icon-size: 2.25rem;
  --icon-width: var(--icon-size);

  display: grid;
  width: 100%;
  place-items: center;
  font-size: var(--voting-font-size);
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  &__icon {
    width: 100%;
  }
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.125rem;
  }
}
.vote {
  @include btn-reset();
  padding: 0;
  margin: 14px;
  position: relative;
  background: none;
  display: inline-block;
  outline: none;
  width: var(--icon-size);
  transition-property: margin-left, margin-right, width;
  transition-duration: var(--animation-delay);
  &:not([disabled]) {
    cursor: pointer;
  }
  &.animation {
    animation:
      icon-animation cubic-bezier(0.165, 0.840, 0.440, 1.000) calc(1s + var(--animation-delay));
    // animation-delay: 800ms;
  }
  &.animation,
  &:focus {
    --icon-fill: var(--brand-color-orange);
  }

  &--bye-bye {
    /* Setting this to zero breaks the transition */
    width: 0.00001px;
    margin-left: 0;
    margin-right: 0;
  }
}
@keyframes icon-animation {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
