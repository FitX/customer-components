<script setup lang="ts">
// import LogoX from '@/assets/logo-x.svg';
import BrandGorilla from '@/assets/brand/gorilla.svg';
const props = defineProps<{
  theme?: 'dark' | 'light',
}>();
</script>

<template>
  <section class="maintenance" :data-theme="props.theme">
    <div class="maintenance__content">
      <brand-gorilla class="maintenance__image" />
      <h1 class="maintenance__title">
        <slot name="title" />
      </h1>
      <p class="maintenance__copy">
        <slot name="copy" />
      </p>
      <slot name="after-copy" />
    </div>
    <svg viewBox="0 0 768 850" xmlns="http://www.w3.org/2000/svg" class="maintenance__bg">
      <path d="M615.912 424.778 884 139.866C798.729 73.17 683.096 23.31 551.959 0L384 178.717 216.041 0C84.904 23.311-30.729 72.523-116 139.866l268.088 284.912L-116 709.69c85.271 66.695 200.904 116.554 332.041 139.865L384 670.838l167.959 178.717c131.137-23.31 246.77-72.53 332.041-139.865L615.912 424.778Z" fill="#1C2223" fill-rule="evenodd"/>
    </svg>
  </section>
</template>

<style lang="scss" scoped>
.maintenance {
  --maintenance-color-bg: var(--brand-color-white-0);
  --maintenance-color-text: var(--brand-color-white-0);

  &:is([data-theme="dark"]) {
    --maintenance-color-bg: var(--brand-color-anthracite-0);
  }

  background: var(--maintenance-color-bg);
  color: var(--maintenance-color-text);

  display: grid;
  height: 100vh;
  overflow: hidden;
  place-items: center;
  text-align: center;

  &__content {
    z-index: 2;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
  }

  &__content,
  &__bg {
    grid-column: 1;
    grid-row: 1;
  }

  &__bg {
    width: 100vw;
  }

  &__copy {
    margin-bottom: 1rem;
  }

  &__image {
    width: 100%;
    max-width: 8.625rem;
    margin-bottom: 3rem;
    animation: swing ease-in-out 1s infinite alternate;
    transform-origin: top;
  }
}

@keyframes swing {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-4deg);
  }
}
</style>
