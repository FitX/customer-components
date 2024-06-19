<script setup lang="ts">
import {
  IconBack,
  IconClear,
  FitxButton,
  FitxLabel,
} from '@fitx/customer-components';

const isANumberRef = ref('5');
</script>

<template>
  <main>
    <h1>Components</h1>
    <fitx-label text="4" modifier="disabled" />
    <fitx-button :msg="isANumberRef" />
    <icon-back />
    <icon-clear />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

<style>
svg {
  --icon-width: 40px;
  --icon-height: 40px;
  --icon-fill: white;
  border: 2px solid white;
}
</style>
