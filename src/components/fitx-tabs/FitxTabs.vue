<script setup>
import { useActiveElement } from '@vueuse/core';
import {
  ref,
  defineProps,
  computed,
  useAttrs,
  unref, onMounted,
} from 'vue';

/*
type Tab = { title: string, content: string, }
const props = defineProps<{
  tabs: Tab[];
}>(); */

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [{ title: '1', content: 'content 1' }, { title: 'voll der lange titel weil wieder keiner bock hat sich damit zu beschäftigen 2', content: 'content 2' }, { title: 'drei', content: 'foo 3'}],
    required: true,
  },
});

const attrs = useAttrs();
const activeElement = useActiveElement();

const DEFAULT_ID_NAME = 'fitx-tab';
const tabsContainerEl = ref();
const componentId = computed(() => attrs?.id || DEFAULT_ID_NAME);

const generateId = (index) => {
  const { id } = attrs;
  if (id) return `${id}-${index}`;
  return `${unref(componentId)}-${index};`;
};

const tabs = computed(() => props.tabs.map((tab, index) => ({ id: generateId(index), ...tab })));
const selectedTabIndex = ref(0);

const getNextElement = (nodes) => {
  // eslint-disable-next-line no-underscore-dangle
  const _activeElement = unref(activeElement);
  return nodes
    .find((node) => (
      Number(
        node.dataset.tabTriggerIndex) === (Number(_activeElement.dataset.tabTriggerIndex) + 1)
    )) || nodes[0];
};

const getPrevElement = (nodes) => {
  // eslint-disable-next-line no-underscore-dangle
  const _activeElement = unref(activeElement);
  return nodes
    .find((node) => (
      Number(
        node.dataset.tabTriggerIndex) === (Number(_activeElement.dataset.tabTriggerIndex) - 1)
    )) || nodes.at(-1);
};

const selectTabIndex = (index) => {
  const currentIndex = unref(selectedTabIndex);
  /**
   * back = -1 | forward 1
   * @type {-1 | 0}
   */
  const direction = currentIndex < index ? 1 : -1;
  const outsideOfRange = unref(tabs).length <= index;
  selectedTabIndex.value = outsideOfRange ? 0 : index;
  const resultElements = [...unref(tabsContainerEl).childNodes].filter((node) => node?.role === 'tab');
  const el = direction === 1 ? getNextElement(resultElements) : getPrevElement(resultElements);
  el.focus();
};

onMounted(() => {
  console.log(tabsContainerEl.value);
});
</script>

<template>
  <div
      class="tabs"
      :style="[ `--tabs-item-count: ${tabs.length}; --tabs-current-index: ${selectedTabIndex}` ]">
      <div
          class="tabs__nav"
          ref="tabsContainerEl"
          role="tablist"
          :aria-labelledby="`${componentId}`">
        <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :id="tab.id"
            :data-tab-trigger-index="index"
            type="button"
            role="tab"
            class="tabs__trigger"
            :class="{ 'tabs__trigger--is-active' : selectedTabIndex === index}"
            @keydown.right.prevent.stop="selectTabIndex((index + 1))"
            @keydown.left.prevent.stop="selectTabIndex((index - 1))"
            @click="selectTabIndex(index)"
            :aria-selected="selectedTabIndex === index"
            :tabindex="selectedTabIndex === index ? undefined : -1"
            :aria-controls="`${componentId}-content-${index}`">
          <span>{{ tab.title }}</span>
        </button>
        <div class="slider"></div>
      </div>

      <div
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :id="`${componentId}-content-${index}`"
          role="tabpanel"
          class="tabs__panel"
          :class="{ 'tabs__panel--is-hidden' : selectedTabIndex !== index}"
          tabindex="0"
          :aria-labelledby="tab.id">
        {{ tab.content }}
      </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixin-reset' as reset;
.tabs {
  --tabs-nav-color-background: var(--brand-color-gray-ash);
  --tabs-nav-color: var(--brand-color-anthracite);
  --tabs-trigger-active-color-background: #fff;
  --tabs-border-radius: 8px;
  --tabs-nav-outer-spacing: 2px;
  --tabs-nav-gap: 6px;
  --tabs-item-count: 2;

  // --tabs-border-radius: 0px;
  // --tabs-nav-gap: 0px;
  // --tabs-nav-outer-spacing: 0px;

  &__nav {
    position: relative; // for slider
    overflow: hidden;
    display: grid;
    gap: var(--tabs-nav-gap);
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    background: var(--tabs-nav-color-background);
    color: var(--tabs-nav-color);
    border-radius: var(--tabs-border-radius);
    padding: 2px;
  }

  &__trigger {
    @include reset.btn-reset();

    --_tabs-trigger-active-color-background: transparent;

    padding: 8px;
    font-size: 1rem;
    line-height: 1;
    border-radius: var(--tabs-border-radius);
    z-index: 2;
    background: none;
    // background: var(--_tabs-trigger-active-color-background);
    span {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &--is-active {
      // --_tabs-trigger-active-color-background: var(--tabs-trigger-active-color-background);
    }
  }

  &__panel {
    &--is-hidden {
      @include reset.sr-only();
    }
  }
}

.slider {
  background: red;
  border-radius: calc(var(--tabs-border-radius) - var(--tabs-nav-outer-spacing));
  /* width: calc(
      (100% / var(--tabs-item-count))
      - (2 * var(--tabs-nav-outer-spacing))
      - ((var(--tabs-item-count) - 2) * var(--tabs-nav-gap))
  ); */
  width: calc(
      (100%
      - (2 * var(--tabs-nav-outer-spacing))
      - ((var(--tabs-item-count) - 1) * var(--tabs-nav-gap))
      ) / var(--tabs-item-count)
  );
  translate:
    calc(
      (var(--tabs-current-index) * 100%)
      + (var(--tabs-current-index) * (var(--tabs-nav-gap)))
    ) 0;
  transition: translate 300ms ease-in-out;
  position: absolute;
  z-index: 1;
  // top: var(--tabs-nav-outer-spacing);
  // left: var(--tabs-nav-outer-spacing);
  // height: calc(100% - (2 * var(--tabs-nav-outer-spacing)));
  inset: var(--tabs-nav-outer-spacing);
  // margin: var(--tabs-nav-outer-spacing);
}
</style>
