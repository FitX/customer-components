<template>
  <span
    aria-hidden="true"
    class="error-icon-wrapper">
    <span class="error-icon">!</span>
  </span>
</template>

<script>
export default {
  name: 'ErrorIcon',
};
</script>

<style scoped lang="scss">
.error-icon {
  align-self: center;
}
.error-icon-wrapper {
  --error-icon-size: 2.2rem;
  display: flex;
  align-content: center;
  justify-content: center;
  user-select: none;
  width: var(--error-icon-size);
  height: var(--error-icon-size);
  border: 1px solid currentColor;
  border-radius: var(--error-icon-size);
  color: var(--functional-color-error);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4rem;
}
/*.error-icon {
  --error-icon-size: 2.4rem;
  user-select: none;
  width: var(--error-icon-size);
  height: var(--error-icon-size);
  color: #B00000;
}*/
</style>
