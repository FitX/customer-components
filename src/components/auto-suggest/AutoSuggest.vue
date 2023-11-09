<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import {
  ref, computed, toValue, watch, defineEmits, defineProps, onMounted, defineExpose, useAttrs,
} from 'vue';
import { useActiveElement, useMagicKeys, useFocusWithin } from '@vueuse/core';
import BaseInput from '@/components/base-input/BaseInput.vue';

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
  showNoResults: {
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
const isTouched = ref(false);

const attrs = useAttrs();

console.log('attrs', attrs);

const getID = (prefix) => {
  const { id } = toValue(attrs);
  return id ? `${id}-${prefix}` : `auto-suggest-${prefix}`;
};

const labelId = computed(() => getID('label'));
const inputId = computed(() => getID('input'));
const resultsId = computed(() => getID('results'));
const resultIdPrefix = computed(() => getID('results-item'));

const isResultEl = (id = '') => id.startsWith(toValue(resultIdPrefix));
const focusedResultId = computed(() => {
  const elId = toValue(activeElement).id;
  if (isResultEl(elId)) {
    return elId;
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
  emitValue(toValue(props.suggestions[index].value));
  closeResults();
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
  watch(isFocusedWithinComponent, (val) => {
    /**
     * Touched === if leave Focus
     */
    if (!val) {
      isTouched.value = true;
    }
  });
  watch(currentInputKey, (val) => {
    if (toValue(isFocusedWithinComponent)) {
      const _activeElement = toValue(activeElement);
      if (val.has('enter') && _activeElement.id !== toValue(inputId)) {
        selectResult(Number(_activeElement.dataset.index));
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
    }
  });
});

// const fooooooooo = (irgendwas) => console.log('irgendwas', irgendwas);

defineExpose({
  deinVater: elInput,
});
</script>

<template>
  <div ref="elComponent" role="combobox" :aria-labelledby="labelId">
    <base-input
        autocomplete="off"
        :label="props.label"
        :ref="(comp) => elInput = comp.elInput"
        role="textbox"
        aria-autocomplete="list"
        :model-value="modelValue"
        @input="onInput"
        :aria-expanded="isExpanded"
        :aria-controls="resultsId"
        :label-id="labelId"
        :is-dark-mode="attrs.isDarkMode"
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
          v-if="props.showNoResults && props.suggestions.length === 0 && isTouched">
        <!--
         @slot Fallback Slot, visible after touched
       -->
        <slot name="fallback"></slot>
      </li>
      <li
          v-for="(item, index) in props.suggestions"
          :key="index"
          :id="`${resultIdPrefix}-${index}`"
          :data-index="index"
          @click="selectResult(index)"
          role="listitem"
          tabindex="0"
      >
        <!--
         @slot Default Item Slot
       -->
        <slot name="item" :item="item">
          {{ item.value }}
        </slot>
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
