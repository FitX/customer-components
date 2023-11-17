<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// eslint-disable-next-line
import {
  ref, computed, unref, defineEmits, defineProps, useAttrs, watch,
} from 'vue';
// eslint-disable-next-line
import { useActiveElement, onClickOutside } from '@vueuse/core';
// eslint-disable-next-line
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

const DEFAULT_ID_NAME = 'auto-suggest';

// const modelValue = defineModel();
const activeElement = useActiveElement();
const elComponent = ref();
const elInput = ref();
const elResults = ref();
const isTouched = ref(false);

const attrs = useAttrs();

const componentId = computed(() => attrs?.id || DEFAULT_ID_NAME);

const getID = (prefix) => {
  const { id } = unref(attrs);
  return id ? `${id}-${prefix}` : `${unref(componentId)}-${prefix}`;
};
/*
const generateId = (index) => {
  const { id } = attrs;
  if (id) return `${id}-${index}`;
  return `${unref(componentId)}-${index}`;
}; */

const labelId = computed(() => getID('label'));
const inputId = computed(() => getID('input'));
const resultsId = computed(() => getID('results'));
const resultIdPrefix = computed(() => getID('results-item'));

const isResultEl = (id = '') => id.startsWith(unref(resultIdPrefix));
const focusedResultId = computed(() => {
  const elId = unref(activeElement).id;
  if (isResultEl(elId)) {
    return elId;
  }
  return undefined;
});
const isExpanded = ref(false);

const openResults = () => {
  isExpanded.value = true;
};

const closeResults = () => {
  isExpanded.value = false;
};

const selectResult = (index) => {
  emitValue(unref(props.suggestions[index].value));
  focusInput();
  closeResults();
};

const focusResult = (index) => {
  const resultElements = [...unref(elResults).childNodes].filter((node) => node?.role === 'listitem');
  const el = resultElements[index];
  if (el) {
    elInput.value.setAttribute('aria-activedescendant', el.id);
    el.focus();
  }
};

const focusInput = () => {
  elInput.value.focus();
};

const onInput = (e) => {
  emitValue(e.target.value);
  if (!isExpanded.value) {
    openResults();
  }
};

const inputOnBlur = () => {
  isTouched.value = true;
};

onClickOutside(elComponent, () => {
  closeResults();
});

watch(props.modelValue, (newVal, oldVal) => {
  if (props.suggestions.length > 0 && (newVal !== oldVal)) {
    openResults();
  }
});

const whatsup = (event) => {
  console.log(event)
  if (!['ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End', 'Meta'].includes(event.key)) {
    focusInput();
  }
  /* if (new RegExp(/^[a-z@-Z0-9?().,'+ /:@-](?: ?[a-z@-Z0-9?().,'+ /:@-]+)*$/).test(event.key)) {
    focusInput();
  } */
};
</script>

<template>
  <p>Is Expanded {{ isExpanded }}</p>
  <div
      class="auto-suggest"
      :class="attrs.class"
      ref="elComponent" role="combobox" :aria-labelledby="labelId">
    <base-input
        autocomplete="off"
        :label="props.label"
        :ref="(comp) => elInput = comp.elInput"
        role="textbox"
        aria-autocomplete="list"
        :model-value="modelValue"
        @input="onInput"
        @blur="inputOnBlur()"
        @focus="openResults()"
        @keydown.down.prevent.stop="focusResult(0)"
        @keydown.esc.prevent.stop="closeResults()"
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
          v-if="props.showNoResults && props.suggestions.length === 0 && isTouched"
        class="auto-suggest-results__item">
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
          class="auto-suggest-results__item"
          @click="selectResult(index)"
          @keydown.home.prevent.stop="focusResult(0)"
          @keydown.end.prevent.stop="focusResult((props.suggestions.length - 1))"
          @keydown.enter.prevent.stop="selectResult(index)"
          @keydown.down.prevent.stop="focusResult((index + 1))"
          @keydown.up.prevent.stop="focusResult((index - 1))"
          @keydown.esc.prevent.stop="closeResults()"
          @keydown="whatsup"
          role="listitem"
          tabindex="0"
      >
        <!--
         @slot Default Item Slot
       -->
        <slot name="item" v-bind="{ item, index }">
          {{ item.value }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixin-reset' as reset;

.auto-suggest {
  --auto-suggest-font-size: var(--form-input-font-size, 1.125rem);
  --auto-suggest-results-border-color: var(--brand-color-gray-ash);
  --auto-suggest-results-border-radius: var(--form-input-border-radius, 0.5rem);
  --auto-suggest-spacing-h: 1.125rem;
  --auto-suggest-spacing-v: 1.125rem;
}
.auto-suggest-results {
  @include reset.list-unstyled();

  margin: 0;
  padding: 0;
  font-size: var(--auto-suggest-font-size);
  border: 1px solid var(--auto-suggest-results-border-color);
  border-radius: var(--auto-suggest-results-border-radius);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.10);
  max-height: 26.1875rem; // 419
  overflow-y: auto;
  &:not(&--is-expanded) {
    @include reset.sr-only();
  }

  &__item {
    margin: 0;
    padding: var(--auto-suggest-spacing-v) var(--auto-suggest-spacing-h);
    &:focus-visible {
      background: rgba(0, 0, 0, 0.03);
    }
    &:not(:first-child) {
      border-top: 1px solid var(--brand-color-gray-smoke);
    }
  }
}
</style>
