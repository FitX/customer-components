<template>
  <icon-valid class="valid-icon" />
</template>

<script>
import IconValid from '@/assets/icons/icon-checkmark.svg';

export default {
  name: 'ValidIcon',
  components: {
    IconValid,
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/form.scss';
.valid-icon {
  // --valid-icon-size: 2.7rem;
  --icon-size: 2.4rem;
  --icon-width: var(--icon-size);
  --icon-height: var(--icon-size);
  --icon-fill: var(--functional-color-success);
  color: #00AE96;
  font-size: 1.4rem;
  display: flex;
  align-content: center;
  justify-content: center;
  user-select: none;
  // width: var(--valid-icon-size);
  // height: var(--valid-icon-size);
}
</style>
