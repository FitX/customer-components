<script setup lang="ts">
import {
  type Book,
  FitxButton,
  FitxAnotherButton,
  isDefined,
} from '@fitx/customer-components';
import { computed, ref } from 'vue';

const isANumberRef = ref('5');
const mayBeBook = ref<Book>({
  author: 'Frank',
  year: 2024,
  title: 'sollte so stimmen',
});

const maybeDefined = ref('nice');
const tach = computed(() => isDefined(maybeDefined));

const example = ref(Math.random() ? 'example' : undefined);
const check = () => isDefined(example);
</script>

<template>
  <main>
    <h1>Components</h1>
    <fitx-button :msg="isANumberRef" deine-mudda="foo" />
    <fitx-another-button :book="mayBeBook" />
    <pre>
      tach {{ tach }}
      example: {{ example }} {{ check() }}
    </pre>
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
