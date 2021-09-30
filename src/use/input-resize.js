import { computed, ref } from 'vue';

export default function (element = null) {
  const componentRef = computed(() => element?.value || null);
  const autoHeight = ref('auto');
  const offset = computed(() => {
    if (!componentRef.value) return 0;
    const {
      offsetHeight = 0,
      clientHeight = 0,
    } = componentRef.value;
    return (offsetHeight - clientHeight);
  });
  const inputHeight = computed(() => {
    if (!componentRef.value) return 0;
    return (componentRef.value.scrollHeight + offset.value);
  });
  function resize() {
    autoHeight.value = 'auto';
    setTimeout(() => {
      autoHeight.value = `${componentRef.value.scrollHeight + offset.value}px`;
    }, 1);
  }
  // 0-timeout to get the already changed text
  function delayedResize() {
    setTimeout(resize, 1);
  }
  return {
    delayedResize,
    autoHeight,
    inputHeight,
  };
}
