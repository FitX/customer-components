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
import ErrorIcon from '@/components/error-icon/ErrorIcon.vue';

export default {
  name: 'ErrorMessage',
  components: {
    ErrorIcon,
  },
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/colors.scss';
.error-message {
  @include functional-colors();
  color: var(--functional-color-error);
  font-size: 1.4rem;
  display: grid;
  width: 100%;
  grid-template-columns: 2rem 1fr;
  grid-gap: 1rem;
  align-items: center;
  background: red;
}
</style>
