<template>
  <section
    class="demo"
    :class="{ 'demo--dark' : isDarkMode }">
    <h1>Links</h1>
    <section class="demo__section">
      <a href="#" class="link">Normaler Hyperlink</a>
      <a href="#" class="link link--fake-hover">Normaler Hyperlink Hover</a>
    </section>
    <section class="demo__section">
      <a href="#" class="decent">Dezenter Hyperlinkk</a>
      <a href="#" class="decent decent--fake-hover">Dezenter Hyperlink Hover</a>
    </section>
  </section>
</template>

<script>
import { isDarkMode } from '../../.storybook/template-helpers/use-template-theme-detection';

export default {
  setup() {
    return {
      isDarkMode,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/links.scss';

.demo {
  font-size: 1.6rem;
  &--dark {
    color: #fff;
  }
  &__section {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1rem;
  }
}
.link {
  @include text-links();
}

.decent {
  @include text-links-decent();
  .demo--dark & {
    @include text-links-decent(dark);
  }
}
</style>
