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
const filterEvenElement = (array = []) => array.filter((item, index) => index % 2 === 0);
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
  props: {
    title: {
      type: String,
      default: null,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
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
    const vote = ref(null);
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
    :style="{ '--voting-icon-count': numberOfVotes }">
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
        :class="[{ 'animation' : vote === icon.index }, `vote--${icon.index}`]"
        :disabled="isVoted"
        class="vote vote--up"
        :aria-label="`Bewerte mit ${icon.title}`"
        @click="saveVote(icon.index)">
        <component
          :is="icon.component"
          class="rating__icon"
        ></component>

        <animation-satellite
          :animation="vote === icon.index"></animation-satellite>
      </button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '@/assets/styles/mixin-reset.scss';

.rating {
  --vote-color: var(--brand-color-anthracite);
  --icon-size: 3.6rem;

  display: grid;
  grid-gap: 1em;
  align-items: center;
  font-size: var(--voting-font-size);
  &__buttons {
    display: grid;
    grid-template-columns: repeat(var(--voting-icon-count), var(--icon-size));
    grid-gap: 2.8rem;
  }
  &__icon {
    width: var(--icon-size);
  }
}
.vote {
  @include btn-reset();
  padding: 0;
  position: relative;
  background: none;
  display: inline-block;
  outline: none;
  &.animation {
    animation: icon-animation cubic-bezier(0.165, 0.840, 0.440, 1.000) 1.2s;
  }
  &.animation,
  &:focus {
    --vote-color: var(--brand-color-orange);
  }
}
@keyframes icon-animation {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
