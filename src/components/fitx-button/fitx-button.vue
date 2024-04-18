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
