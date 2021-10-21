<template>
  <div
    class="requirements"
    :class="[
      getModifierClasses('requirements', [
        isDarkMode ? 'dark' : null,
      ]),
    ]">
    <ul
      class="requirements__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="requirements__item requirement"
        :class="[
          getModifierClasses('requirement', [
            item.done ? 'done' : null,
          ]),
        ]">
        <icon-checkmark class="requirement__icon" />
        <span class="requirement__text">{{ item.title }} {{ item.done }} dark: {{ isDarkMode }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { watch } from 'vue';
import useModifier from '@/use/modifier-class';
import IconCheckmark from '@/assets/icons/icon-checkmark.svg';

/**
 * @typedef {{title: string, done: boolean}} RequirementItem
 */
/**
 * @typedef {Array<RequirementItem>} RequirementItemsModel
 */

export default {
  name: 'RequirementsList',
  inheritAttrs: false,
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * items {RequirementItemsModel}
     */
    items: {
      type: Array,
      default: () => {},
    },
  },
  emits: [
    /**
     * Fires on items Update
     * @property {boolean} val - true if all Done
     */
    'all-done',
  ],
  components: {
    IconCheckmark,
  },
  setup: (props, { emit }) => {
    watch(props.items, (list) => {
      /**
       * Check all Items Done
       * @type {boolean}
       */
      const allItemsDone = list
        .every((item) => item.done);
      emit('all-done', allItemsDone);
      console.log(list, allItemsDone);
    });
    const { getModifierClasses } = useModifier();
    return {
      getModifierClasses,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/form.scss';
@import '~@/assets/styles/mixin-reset.scss';

.requirements {
  $self: &;
  --requirements-color-bg: var(--brand-color-gray-chalk);
  --requirements-space: 2.4rem;
  --requirements-border-radius: var(--form-input-border-radius, 0.8rem);
  --requirements-font-size: 1.4rem;
  --requirements-color-text: var(--brand-color-gray-graphite);
  --requirements-color-icon: #fff;
  --requirements-color-icon-bg: var(--brand-color-gray-ash);

  background: var(--requirements-color-bg);
  padding: var(--requirements-space);
  font-size: var(--requirements-font-size);
  border-radius: var(--requirements-border-radius);

  &--dark {
    --requirements-color-bg: var(--brand-color-anthracite-3);
    --requirements-color-text: var(--brand-color-gray-steel);
    --requirements-color-icon: var(--brand-color-gray-cement);
    --requirements-color-icon-bg: var(--brand-color-gray-carbon);
  }

  &__list {
    @include list-unstyled();
    margin: 0;
  }
  &__item {
    &:not(:first-child):not(:last-child) {
      margin: 1.3rem 0;
    }
  }
}

.requirement {
  --requirement-icon-size: 2rem;
  --requirement-color-text: var(--requirements-color-text);
  --requirement-color-icon: var(--requirements-color-icon);
  --requirement-color-icon-bg: var(--requirements-color-icon-bg);
  display: grid;
  width: 100%;
  font-weight: 300;
  grid-template-columns: var(--requirement-icon-size) 1fr;
  gap: 1.5rem;
  color: var(--requirement-color-text);

  &--done {
    --requirement-color-icon: #fff;
    --requirement-color-icon-bg: var(--functional-color-success);
    --requirement-color-text: var(--functional-color-success);
  }

  &__icon {
    --icon-fill: var(--requirement-color-icon);
    background: var(--requirement-color-icon-bg);
    border-radius: var(--requirement-icon-size);
    padding: 0.3rem;
  }
}
</style>
