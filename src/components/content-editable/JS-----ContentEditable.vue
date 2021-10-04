<template>
  <component
    :is="tag"
    ref="refComponent"
    class="content-editable"
    :contenteditable="true"
    @input="update"
    @blur="update"
    @keypress="onKeypress"
    @paste="onPaste"
  />
</template>

<script>
import { ref, onMounted, watch } from 'vue';

/**
 * String Replace Method
 * @param {string} source - original
 * @param {string} search - search term
 * @param {string} replacement - replace with term
 * @return {*}
 */
function replaceAll(source, search, replacement) {
  return source.split(search).join(replacement);
}

export default {
  name: 'ContentEditable',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    modelValue: {
      type: String,
      default: null,
    },
    allowNewLine: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    'update:modelValue': String,
  },
  setup(props, { emit, attrs }) {
    const refComponent = ref(null);
    function trimContent(value) {
      const trimNeeded = (attrs.maxLength && (attrs.maxLength <= value.length));
      return trimNeeded ? value.substring(0, attrs.maxLength) : value;
    }
    function getContent() {
      return trimContent(refComponent.value.innerText);
    }
    function updateContent(value) {
      refComponent.value.innerText = trimContent(value);
    }
    function update() {
      const content = getContent();
      if (!(attrs.maxLength && (attrs.maxLength <= content.length))) {
        emit('update:modelValue', content);
      }
    }
    function onPaste(event) {
      event.preventDefault();
      let text = (event.originalEvent || event).clipboardData.getData('text/plain');
      if (!props.allowNewLine) {
        text = replaceAll(text, '\r\n', ' ');
        text = replaceAll(text, '\n', ' ');
        text = replaceAll(text, '\r', ' ');
      }
      window.document.execCommand('insertText', false, text);
    }
    function onKeypress(event) {
      if (event.key === 'Enter' && !props.allowNewLine) {
        event.preventDefault();
        // emit('returned', getContent());
      }
    }
    onMounted(() => {
      updateContent(props.modelValue ?? '');
    });
    watch(() => props.modelValue, (newVal) => {
      if (trimContent(newVal) !== getContent()) {
        updateContent(newVal ?? '');
      }
    });
    return {
      update,
      onPaste,
      onKeypress,
      refComponent,
    };
  },
};
</script>

<style scoped>
.content-editable {
  height: 100%;
}
</style>
