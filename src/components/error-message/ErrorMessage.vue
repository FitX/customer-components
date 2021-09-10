<template>
  <span
    role="alert"
    data-test="error"
    class="error-message">
    <error-icon
      class="error-message__icon" />
    <span class="error-message__text">
      {{ errorMessage }}
    </span>
  </span>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    ErrorIcon: defineAsyncComponent(() => import('@/components/error-icon/ErrorIcon.vue')),
  },
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
.error-message {
  color: var(--functional-color-error);
  font-size: 1.4rem;
  display: grid;
  width: 100%;
  grid-template-columns: 2rem 1fr;
  grid-gap: 1rem;
  align-items: center;
}
</style>
