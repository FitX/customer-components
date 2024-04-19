<script lang="ts" setup>
import { IconClose } from '@/components/icons';
const props = defineProps<{
  msg: string,
}>();
</script>
<template>
  <button>{{ props.msg }}</button>
  <icon-close />
</template>

<style lang="scss" scoped>
button { border: 2px dashed red; padding: 2rem; }
</style>
