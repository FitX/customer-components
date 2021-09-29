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
import ErrorIcon from '@/assets/icons/icon-error.svg';

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

<style scoped lang="scss">
@import '~@/assets/styles/colors.scss';
.error-message {
  color: var(--functional-color-error);
  font-size: 1.4rem;
  display: grid;
  width: 100%;
  grid-template-columns: 2rem 1fr;
  grid-gap: 0.4rem;
  align-items: center;

  &__icon {
    --icon-size: 1.8rem;
    --icon-width: var(--icon-size);
    --icon-height: var(--icon-size);
    --icon-fill: var(--functional-color-error);
  }
}
</style>
