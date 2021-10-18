<template>
  <ul
    v-if="colors"
    class="colors">
    <li
      v-for="color in colors"
      class="color"
      :class="{ 'color--dark' : color.name.endsWith('-dark')}"
      :key="color.value">
      <span class="color__figure" :style="`--color: ${color.value}`"></span>
      <span class="color__details">
        <input
          class="color__input color__input--name"
          :value="color.name"
          readonly />
        <input
          class="color__input"
          :value="color.value"
          readonly />
        <input
          class="color__input color__input--rgba"
          :value="hexToRGB(color.value)"
          readonly />
      </span>
    </li>
  </ul>
</template>

<script>
function hexToRGB(h) {
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (h.length === 4) {
    // r = '0x' + h[1] + h[1];
    r = `0x${h[1] + h[1]}`;
    g = `0x${h[2] + h[2]}`;
    b = `0x${h[3] + h[3]}`;

    // 6 digits
  } else if (h.length === 7) {
    r = `0x${h[1] + h[2]}`;
    g = `0x${h[3] + h[4]}`;
    b = `0x${h[5] + h[6]}`;
  }

  return `rgb(${+r},${+g},${+b})`;
}
export default {
  props: {
    colors: {
      type: Array,
      default: null,
    },
  },
  setup() {
    return {
      hexToRGB,
    };
  },
};
</script>

<style scoped lang="scss">
.colors {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.color {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  transition: box-shadow 0.15s;
  &--dark {
    background: var(--brand-color-anthracite);
    color: #fff;
  }
  &__figure {
    background-color: var(--color);
    border-radius: 2px 2px 0 0;
    display: block;
    height: 10rem;
  }
  &__details {
    display: grid;
    grid-gap: 1rem;
    grid-row-gap: 0.1rem;
    // grid-template-columns: 1fr 10ch;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 100%;
    font-size: 1.6rem;
  }
  &__input {
    border: 0;
    display: block;
    font-size: inherit;
    margin: 0;
    padding: 0.5rem;
    width: 100%;
    background: transparent;
    color: inherit;

    &--name {
      font-weight: 600;
    }
  }
}
</style>
