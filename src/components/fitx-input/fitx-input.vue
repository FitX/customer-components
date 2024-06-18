<script lang="ts">
import type { Theme } from '@/types';
export type FitxInputProps = {
  theme?: Theme;
};
</script>

<script lang="ts" setup>
const props = defineProps<FitxInputProps>();
</script>
<template>
  <div class="input"></div>
</template>

<style lang="scss" scoped>
.input {}
</style>
