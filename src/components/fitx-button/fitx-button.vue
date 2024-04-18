<script lang="ts" setup>
import IconClose from '@/assets/icons/close.svg';
const props = defineProps<{
  msg: string,
}>();
</script>
<template>
  <button>{{ props.msg }}</button>
  <icon-close />
</template>
