<script lang="ts" setup>
const props = defineProps<{
  msg: string,
}>();
</script>
<template>
  <button>{{ props.msg }}</button>
</template>
