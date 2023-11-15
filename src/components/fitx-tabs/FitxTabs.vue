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
    default: () => [{ title: '1', content: 'content 1' }, { title: '2', content: 'content 2' }],
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
  if (nodes.length > Number(_activeElement.dataset.tabTriggerIndex)) {
    return nodes
      .find((node) => (
        Number(node.dataset.tabTriggerIndex) === (Number(_activeElement.dataset.tabTriggerIndex) + 1)));
  }
  return nodes[0];
};

const getPrevElement = (nodes) => {
  // eslint-disable-next-line no-underscore-dangle
  const _activeElement = unref(activeElement);
  if (Number(_activeElement.dataset.tabTriggerIndex) > 0) {
    return nodes
      .find((node) => (
        Number(node.dataset.tabTriggerIndex) === (Number(_activeElement.dataset.tabTriggerIndex) - 1)));
  }
  return nodes[0];
};

const selectTabIndex = (index) => {
  const {
    isNext,
    // isPrev,
  } = {
    isNext: unref(selectedTabIndex) < index,
    isPrev: unref(selectedTabIndex) > index,
  };
  const newIndex = unref(tabs).length < index ? 0 : index;
  selectedTabIndex.value = newIndex;
  const resultElements = [...unref(tabsContainerEl).childNodes].filter((node) => node?.role === 'tab');
  console.log('resultElements', resultElements);
  const el = isNext ? getNextElement(resultElements) : getPrevElement(resultElements);
  el.focus();
};

onMounted(() => {
  console.log(tabsContainerEl.value);
});
</script>

<template>
  <div class="tabs">
      <div
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
            @keydown.right.prevent.stop="selectTabIndex((index + 1))"
            @keydown.left.prevent.stop="selectTabIndex((index - 1))"
            :aria-selected="selectedTabIndex === index"
            :tabindex="selectedTabIndex === index ? undefined : -1"
            :aria-controls="`${componentId}-content-${index}`">
          {{ tab.title }}
        </button>
      </div>

      <div
          v-for="(tab, index) in tabs"
          :key="tab.id"
          :id="`${componentId}-content-${index}`"
          role="tabpanel"
          tabindex="0"
          :aria-labelledby="tab.id">
        {{ tab.content }}
      </div>
  </div>
</template>
