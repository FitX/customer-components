<template>
  <section
    :class="[ { 'accordion--dark' : isDarkMode } ]"
    class="accordion">
    <!--
      @slot Default for Accordion Items
    -->
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AccordionWrapper',
  props: {
    /**
     * Option to render in Dark Mode (Currently no explicit Styles)
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.accordion {
  $self: &;
  --accordion-spacing: 24px;
  --accordion-border-color: var(--brand-color-gray-plumb);
  border: 1px solid var(--accordion-border-color);
  border-radius: 10px;
}
</style>
