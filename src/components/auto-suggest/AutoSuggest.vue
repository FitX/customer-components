<script setup>
import {
  ref, computed, toValue, watch, defineEmits, defineProps, onMounted, nextTick,
} from 'vue';
import { useActiveElement, useMagicKeys, useFocusWithin } from '@vueuse/core';

/*
type Suggestion = { value: string }
const props = defineProps<{
  label: string;
  suggestions: unknown[];
}>(); */
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: null,
  },
  suggestions: {
    // { value: string }[]
    type: Array,
    default: null,
  },
  showResultsTrigger: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const emitValue = (val) => emit('update:modelValue', val);

// const modelValue = defineModel();
const activeElement = useActiveElement();
const { current: currentInputKey } = useMagicKeys();
const elComponent = ref();
const elInput = ref();
const elResults = ref();
const { focused: isFocusedWithinComponent } = useFocusWithin(elComponent);

const labelId = 'auto-suggest-label';
const inputId = 'auto-suggest-input';
const resultsId = 'auto-suggest-results';
const resultIdPrefix = 'auto-suggest-result-item';

const isResultEl = (id = '') => id.startsWith(resultIdPrefix);
const focusedResultId = computed(() => {
  const elId = toValue(activeElement).id;
  if (isResultEl(elId)) {
    return elId.id;
  }
  return undefined;
});
const isExpanded = ref(true);

const openResults = () => {
  isExpanded.value = true;
};

const closeResults = () => {
  isExpanded.value = false;
};

const focusResultEl = (el) => {
  el.setAttribute('aria-activedescendant', el.id);
  el.focus();
};

watch(activeElement, (el) => {
  console.log('focus changed to', el.id);
});

const selectResult = (index) => {
  emitValue(toValue(props.suggestions[index]));
};

const getNextElement = (nodes) => {
  // eslint-disable-next-line no-underscore-dangle
  const _activeElement = toValue(activeElement);
  if (isResultEl(_activeElement.id)) {
    if (nodes.length > Number(_activeElement.dataset.index)) {
      return nodes
        .find((node) => (
          Number(node.dataset.index) === (Number(_activeElement.dataset.index) + 1)));
    }
    return undefined;
  }
  return nodes[0];
};

const focusInput = () => {
  elInput.value.removeAttribute('aria-activedescendant');
  elInput.value.focus();
};

const getPrevElement = (nodes) => {
  // eslint-disable-next-line no-underscore-dangle
  const _activeElement = toValue(activeElement);
  if (isResultEl(_activeElement.id)) {
    if (Number(_activeElement.dataset.index) > 0) {
      return nodes
        .find((node) => (
          Number(node.dataset.index) === (Number(_activeElement.dataset.index) - 1)));
    }
    return undefined;
  }
  return nodes[0];
};

const onInput = (e) => {
  emitValue(e.target.value);
  if (!isExpanded.value) {
    openResults();
  }
};

onMounted(() => {
  /**
   * watch([ArrowUp, ArrowDown], ([up, down]) => {
   *     if (toValue(isFocusedWithinComponent) && down) {
   *       const resultElements = [...toValue(elResults)
   *         .childNodes].filter((node) => isResultEl(node?.id));
   *       const nextElement = getNextElement(resultElements);
   *       if (nextElement) {
   *         focusResultEl(nextElement);
   *       }
   *     } else if (toValue(isFocusedWithinComponent) && up) {
   *       const resultElements = [...toValue(elResults)
   *         .childNodes].filter((node) => isResultEl(node?.id));
   *       const prevElement = getPrevElement(resultElements);
   *       if (prevElement) {
   *         focusResultEl(prevElement);
   *       }
   *     }
   *   });
   */
  watch(currentInputKey, (val) => {
    const _activeElement = toValue(activeElement);
    if (val.has('enter') && _activeElement.id !== inputId) {
      selectResult(Number(_activeElement.dataset.index));
      closeResults();
    }

    if (toValue(isFocusedWithinComponent) && val.has('arrowdown')) {
      if (!isExpanded.value) {
        openResults();
      }
      const resultElements = [...toValue(elResults)
        .childNodes].filter((node) => isResultEl(node?.id));
      const nextElement = getNextElement(resultElements);
      if (nextElement) {
        focusResultEl(nextElement);
      }
    } else if (toValue(isFocusedWithinComponent) && val.has('arrowup')) {
      if (!isExpanded.value) {
        openResults();
      }
      const resultElements = [...toValue(elResults)
        .childNodes].filter((node) => isResultEl(node?.id));
      const prevElement = getPrevElement(resultElements);
      if (prevElement) {
        focusResultEl(prevElement);
      }
    } else if (val.size !== 0) {
      focusInput();
    }
  });
});
</script>

<template>
  <label :for="inputId" :id="labelId">{{ props.label }}</label>
  <div ref="elComponent" role="combobox" :aria-labelledby="labelId">
    <input
        ref="elInput"
        role="textbox"
        aria-autocomplete="list"
        :value="modelValue"
        @input="onInput"
        :aria-expanded="isExpanded"
        :aria-controls="resultsId"
        :id="inputId"
        :aria-activedescendant="focusedResultId"
    />
    <button
        v-if="showResultsTrigger"
        aria-label="toggle dropdown"
        @click="isExpanded ? closeResults() : openResults()">
      <svg width="8" height="4" viewBox="0 0 8 4" fill-rule="evenodd">
        <title>{{ isExpanded ? 'Close results' : 'Show results' }}</title>
        <path d="M8 0L4 4 0 0z"></path>
      </svg>
    </button>
    <ul
        class="auto-suggest-results"
        :class="{ 'auto-suggest-results--is-expanded': isExpanded }"
        ref="elResults"
        role="listbox"
        aria-label="results"
        :id="resultsId">
      <li
          v-for="(item, index) in props.suggestions"
          :key="index"
          :id="`${resultIdPrefix}-${index}`"
          :data-index="index"
          @click="selectResult(index)"
          role="listitem"
          tabindex="0"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.auto-suggest-results {
  &:not(&--is-expanded) {
    visibility: hidden;
  }
}
</style>
