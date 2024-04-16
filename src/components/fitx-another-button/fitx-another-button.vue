<script lang="ts" setup>
import type { Book } from './types';
const props = defineProps<{
  book: Book
}>();
</script>
<template>
  <button>{{ props.book }}</button>
</template>
