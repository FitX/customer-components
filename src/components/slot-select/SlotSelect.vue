<template>
  <section
    class="slot-select"
    :class="[
      getModifierClasses('slot-select', [
        isDarkMode ? 'dark' : null,
      ]),
    ]">
    <ul class="tabs">
      <li
        v-for="(item, index) in items"
        :key="index"
        role="tab"
        @click="selectTitle(index)"
        class="tabs__item"
        :class="[
          getModifierClasses('tabs__item', [
            item.selected ? 'selected' : null,
            item.disabled ? 'disabled' : null,
          ]),
        ]">
        <span class="tab-content">
          <span class="tab-content__sub">{{ item.sub }}</span>
          <span class="tab-content__title">{{ item.title }}</span>
        </span>
      </li>
    </ul>
    <ul
      v-if="visibleSlots"
      class="slots">
      <li
        v-for="(slotItem, index) in visibleSlots"
        :key="index"
        class="slots__item">
        <base-option
          @click="selectSlot(index)"
          :modifier="selectedSlot === index ? 'active' : null"
          class="slots__button"
          :title="slotItem" />
      </li>
    </ul>
    <hr>
    <pre>{{ items }}</pre>
  </section>
</template>

<script>
import { computed, ref } from 'vue';
import useModifier from '@/use/modifier-class';
import BaseOption from '@/components/base-option/BaseOption.vue';

/**
 * @typedef {string} SlotModel
 */
/**
 * @typedef {{
 * title: string,
 * sub: string,
 * disabled: boolean,
 * selected: boolean,
 * slots: Array<SlotModel>}} SlotSelectItemModel
 */
/**
 * @typedef {Array<SlotSelectItemModel>} SlotSelectItemsModel
 */

export default {
  name: 'SlotSelect',
  inheritAttrs: false,
  props: {
    /**
     * Option to render in Dark Mode
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * items {SlotSelectItemsModel}
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: [
    /**
     * Fires on select Title
     * @property {number} titleIndex - Index of Title
     */
    'select-title',
    /**
     * Fires on select Slot
     * @property {number} slotIndex - Index of Slot
     */
    'select-slot',
  ],
  components: {
    BaseOption,
  },
  setup: (props, { emit }) => {
    const { getModifierClasses } = useModifier();
    const selectedSlot = ref(null);
    /**
     * Get Slots by active Tab
     * @type {ComputedRef<*>}
     */
    const visibleSlots = computed(() => {
      const { slots } = props.items.find((tab) => tab.selected) || {};
      return slots;
    });
    const deselectSlot = () => {
      selectedSlot.value = null;
    };
    /**
     * Select Tab
     * reset local selectedSlot
     * @param titleIndex
     */
    const selectTitle = (titleIndex) => {
      deselectSlot();
      emit('select-title', titleIndex);
    };
    /**
     * Select Slot
     * store to local State and emit
     * @param slotIndex
     */
    const selectSlot = (slotIndex) => {
      selectedSlot.value = slotIndex;
      emit('select-slot', slotIndex);
    };
    return {
      getModifierClasses,
      selectTitle,
      visibleSlots,
      selectSlot,
      selectedSlot,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/form.scss';
@import '~@/assets/styles/mixin-reset.scss';

.slot-select {
  $self: &;
  --slot-default-color-bg: var(--functional-color-success-1-light);
  --slot-default-color-text: var(--functional-color-success);
  --slot-disabled-color-bg: var(--brand-color-gray-chalk);
  --slot-disabled-color-text: var(--brand-color-gray-cement);
  --slot-selected-color-bg: var(--functional-color-success);
  --slot-selected-color-text: #fff;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}

.tabs {
  @include list-unstyled();
  --slot-color-bg: var(--slot-default-color-bg);
  --slot-color-text: var(--slot-default-color-text);
  --tabs-width: 11.4rem;
  --tab-gap: 0.4rem;
  --tab-height: 8.5rem;
  --slot-active-triangle-size: 1.3rem;

  margin: 0;
  overflow-x: auto;
  overflow-scrolling: touch;
  // scroll-snap-type: x mandatory;
  scroll-snap-type: x proximity;
  scroll-padding: 50%;
  display: grid;
  // height: calc(var(--tab-height) + var(--slot-active-triangle-size));
  grid-gap: var(--tab-gap);
  grid-auto-flow: column;
  grid-auto-columns: var(--tabs-width);
  font-weight: 300;
  padding-bottom:
    calc(var(--slot-active-triangle-size) + 1rem); // Designer Spacing + Safe Space for scrollbar

  /**
    Hide Scrollbar
   */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &__item {
    display: flex;
    place-items: center;
    border-radius: var(--form-input-border-radius, 0.8rem);
    color: var(--slot-color-text);
    background: var(--slot-color-bg);
    position: relative;
    height: var(--tab-height);
    user-select: none;
    scroll-snap-align: center;
    &:not(&--disabled) {
      cursor: pointer;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transition: transform 0.1s ease;
      background: var(--slot-color-bg);
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
      transform-origin: center center;
      width: var(--slot-active-triangle-size);
      height:  var(--slot-active-triangle-size);
    }

    &--selected {
      --slot-color-bg: var(--slot-selected-color-bg);
      --slot-color-text: var(--slot-selected-color-text);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        background: var(--slot-color-bg);
        transform: translate3d(-50%, 50%, 0) rotate(135deg);
        width: var(--slot-active-triangle-size);
        height:  var(--slot-active-triangle-size);
      }
    }

    &--disabled {
      --slot-color-bg: var(--slot-disabled-color-bg);
      --slot-color-text: var(--slot-disabled-color-text);
    }
  }
}
.tab-content {
  display: grid;
  width: 100%;
  place-items: center;
  font-size: 1.4rem;
  &__title {
    font-weight: 400;
    font-size: 1.8rem;
  }
}
.slots {
  @include list-unstyled();

  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 8rem;
  gap: 1rem;

  &__button {
    width: 100%;
  }
}
</style>
