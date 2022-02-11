<script>
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
    name: {
      type: String,
      default: null,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
    numberOfVotings: {
      type: Number,
      default: 5,
      validator: (value) => {
        const acceptedValues = [2, 3, 5];
        return acceptedValues.includes(value);
      },
    },
    modifier: {
      type: String,
      default: null,
      validator: (value) => {
        const acceptedValues = ['block'];
        return acceptedValues.includes(value);
      },
    },
    additionalStyles: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      vote: null,
      components: [],
      defaultStyles: {
        '--voting-icon-count': this.numberOfVotings,
        '--icon-size': '3.625rem', // 58px
      },
    };
  },
  computed: {
    cssVars() {
      return {
        ...this.defaultStyles,
        ...this.additionalStyles,
      };
    },
  },
  created() {
    const components = [];
    for (let count = 0; count < 5; count += 1) {
      const countNumber = (count + 1);
      // Runs 5 times, with values of step 0 through 4.
      components[count] = {
        index: countNumber,
        title: this.getVoteTitles(count),
        // component: () => import(`@/img/icon-vote-${countNumber}.svg`),
        component: `IconVote${countNumber}`,
      };
    }
    if (this.numberOfVotings === 5) {
      this.components = components;
    } else if (this.numberOfVotings === 3) {
      this.components = filterEvenElement(components);
    } else {
      const filtered = filterEvenElement(components);
      // For only 2 votings, filter and remove middle
      filtered.splice(1, 1);
      this.components = filtered;
    }
  },
  methods: {
    saveVote(count) {
      this.vote = count;
      this.$emit('success', this.vote);
    },
    getVoteTitles(vote) {
      const titles = [
        'nicht so gut',
        'naja',
        'ok',
        'gut',
        'sehr gut',
      ];
      return titles[vote];
    },
  },
};
</script>
<template>
  <div
    class="rating"
    :class="modifier ? `rating--${modifier}` : null"
    :style="cssVars">
    <p
      v-if="description"
      class="rating__description">{{ description }}</p>
    <div
      v-if="components"
      :style="{ '--voting-icon-count' : numberOfVotings }"
      class="rating__buttons">

      <button
        v-for="icon in components"
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
  display: grid;
  grid-gap: 1em;
  align-items: center;
  font-size: var(--voting-font-size);
  @media (min-width: 600px) {
    grid-template-columns: auto 1fr;
  }
  &--block {
    grid-template-columns: 1fr;
    grid-row-gap: 0;
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(var(--voting-icon-count), 3.625rem);
    grid-gap: 1em;
  }
  &__icon {
    // width: 3.625rem; // 50px
  }
}
.vote {
  @include btn-reset();
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
