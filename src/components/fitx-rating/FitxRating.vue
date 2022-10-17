<script>
import { computed, ref } from 'vue';
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
export const directions = [
  'row',
  'column',
];
const titles = [
  'nicht so gut',
  'naja',
  'ok',
  'gut',
  'sehr gut',
];
export default {
  name: 'FitxRating',
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
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * VoteCount of default Vote
     */
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
    /**
     * Visual Direction horizontal: row, vertical: column
     */
    direction: {
      type: String,
      default: 'row',
      validator: (value) => directions.includes(value),
    },
    /**
     * reconsidering possible via preventMultipleVotes: false
     */
    preventMultipleVotes: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const vote = ref(props.voted);
    const components = ref([]);

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

    return {
      vote,
      saveVote,
      componentsByVoteCount,
    };
  },
};
</script>
<template>
  <div
    class="rating"
    :class="{ 'rating--dark' : isDarkMode }"
    :style="{
      '--voting-icon-count': numberOfVotes,
      '--voting-icon-count' : numberOfVotes,
      '--voting-direction' : direction,
    }">
    <button
      v-for="icon in componentsByVoteCount"
      :key="icon.index"
      :class="[
        { 'animation' : vote === icon.index },
        { 'vote--inactive' : vote && vote !== icon.index },
        `vote--${icon.index}`
      ]"
      :disabled="preventMultipleVotes && vote"
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
        v-if="vote === icon.index"
        :animation="true"></animation-satellite>
    </button>
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

  display: inline-flex;
  flex-wrap: wrap;
  place-content: center;
  flex-direction: var(--voting-direction);
  font-size: var(--voting-font-size);

  &--dark {
    --icon-fill: #fff;
  }
  &__icon {
    width: var(--icon-size);
  }
}
.vote {
  @include btn-reset();
  padding: 0;
  margin: 0.875rem;
  position: relative;
  background: none;
  display: flex;
  outline: none;
  &:not([disabled]) {
    cursor: pointer;
    &:not(.animation):hover {
      --icon-fill: var(--brand-color-gray-graphite);
    }
  }
  &.animation {
    animation:
      icon-animation cubic-bezier(0.165, 0.840, 0.440, 1.000) 800ms;
  }
  &.animation,
  &:focus {
    --icon-fill: var(--brand-color-orange);
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
