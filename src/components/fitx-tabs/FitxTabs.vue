<script setup>
import { ref, onMounted, defineProps, computed, useAttrs } from 'vue';

/*
type Tab = { title: string, content: string, }
const props = defineProps<{
  tabs: Tab[];
}>(); */

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [{ title: '1', content: 'content 1' }],
    required: true,
  },
});

const attrs = useAttrs();
const generateId = (index) => {
  const { id } = attrs;
  if (id) return `${id}-${index}`;
  return `fitx-tabs-${index};`
};

const tabs = computed(() => props.tabs.map((tab, index) => ({ id: generateId(index), ...tab })));

/**
 *
 * @type {ToRef<HTMLElement[]>}
 */
const tabsRef = ref();
/**
 * @type {ToRef<HTMLElement[]>}
 */
const tabpanelsRef = ref([]);

/* interface TabListItem {
  tab: HTMLElement;
  tabpanel: HTMLElement;
} */

/**
 *
 * @type {ToRef<TabListItem[]>}
 */
const tabs = ref([]);

/**
 *
 * @param {HTMLElement} tab
 */
const setSelectedTab = (tab) => {
  for (const otherTabs of tabs.value) {
    otherTabs.tab.setAttribute('aria-selected', 'false');
    otherTabs.tab.tabIndex = -1;
    otherTabs.tabpanel.classList.add('is-hidden');
  }

  tab.setAttribute('aria-selected', 'true');
  tab.removeAttribute('tabindex');
  tab.tabpanel.classList.remove('is-hidden');

  tab.focus();
};

onMounted(() => {
  const tablist = tabsRef.value;
  tabs.value = tablist.querySelectorAll('[role=tab]').map((tab) => {
    const tabpanel = document.getElementById(tab.getAttribute('aria-controls'));
    return { tab, tabpanel };
  });

  tablist.addEventListener('keydown', (event) => {
    // const tgt = event.currentTarget as HTMLElement;
    /**
     * @type {C | EventTarget}
     */
    const tgt = event.currentTarget;
    switch (event.key) {
      case 'ArrowLeft':
        setSelectedTab(tabs.value[tabs.value.indexOf(tgt) - 1].tab);
        break;
      case 'ArrowRight':
        setSelectedTab(tabs.value[tabs.value.indexOf(tgt) + 1].tab);
        break;
      case 'Home':
        setSelectedTab(tabs.value[0].tab);
        break;
      case 'End':
        setSelectedTab(tabs.value[tabs.value.length - 1].tab);
        break;
      default:
        break;
    }
  });
});
</script>

<template>
  <div role="tablist" class="automatic">
    <template
        v-for="{ tab, tabpanel } in tabs" :key="tab">
      <button
          :id="tab.id"
          :aria-controls="tabpanel.id"
          role="tab"
          @click="setSelectedTab(tab)"
      >
        {{ tab.textContent }}
      </button>

      <div
          :key="tabpanel.id"
          :id="tabpanel.id" class="tabpanel is-hidden">
        {{ tabpanel.textContent }}
      </div>
    </template>
  </div>
</template>
