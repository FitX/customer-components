<script lang="ts" setup>
import './index.scss';
import type { Book } from './types';
const props = defineProps<{
  book: Book
}>();
</script>
<template>
  <button class="another-button">{{ props.book }} <span class="another-button__jo">jo</span></button>
</template>

<style lang="scss" scoped>
// @import './index.scss';
</style>
