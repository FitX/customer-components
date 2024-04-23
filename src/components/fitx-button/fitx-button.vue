<script lang="ts" setup>
import { IconClose } from '@/components/icons';
const props = defineProps<{
  theme: 'dark' | 'light',
  msg: string,
}>();
</script>
<template>
  <button :data-theme="props.theme">{{ props.msg }} {{ props.theme }}</button>
  <icon-close />
</template>

<style lang="scss" scoped>
button {
  --demo-border-color: red;

  &[data-theme=dark] {
    --demo-border-color: blue;
  }

  border: 5px dashed var(--demo-border-color); padding: 2rem; margin: 1rem; outline: 5px solid var(--demo-border-color);
}
</style>
