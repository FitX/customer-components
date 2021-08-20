<template>
  <ul class="colors">
    <li
      v-for="color in colors"
      class="color"
      :key="color.value">
      <span class="color__figure" :style="`--color: ${color.value}`"></span>
      <span class="color__details">
        <input
          class="color__input"
          :value="color.name"
          readonly />
        <input
          class="color__input"
          :value="color.value"
          readonly />
      </span>
    </li>
  </ul>
</template>

<script>
import { onMounted, ref } from 'vue';

/*
 Check if the stylesheet is internal or hosted on the current domain.
 If it isn't, attempting to access sheet.cssRules will throw a cross origin error.
 See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet#Notes

 NOTE: One problem this could raise is hosting stylesheets on a CDN with a
 different domain. Those would be cross origin, so you can't access them.
*/
const isSameDomain = (styleSheet) => {
  // Internal style blocks won't have an href value
  if (!styleSheet.href) {
    return true;
  }

  return styleSheet.href.indexOf(window.location.origin) === 0;
};

/*
 Determine if the given rule is a CSSStyleRule
 See: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
*/
const isStyleRule = (rule) => rule.type === 1;

/**
 * Get all custom properties on a page
 * @return array<array[string, string]>
 * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
 */
const getCSSCustomPropIndex = () =>
  // styleSheets is array-like, so we convert it to an array.
  // Filter out any stylesheets not on this domain
  [...document.styleSheets].filter(isSameDomain).reduce(
    (finalArr, sheet) => finalArr.concat(
      // cssRules is array-like, so we convert it to an array
      [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
        const props = [...rule.style]
          .map((propName) => [
            propName.trim(),
            rule.style.getPropertyValue(propName).trim(),
          ])
          // Discard any props that don't start with "--". Custom props are required to.
          .filter(([propName]) => propName.indexOf('--brand-color') === 0);
        console.log('propValArr', ...propValArr);
        console.log('props', ...props);
        return [...propValArr, ...props];
      }, []),
    ), [],
  ).map(
    ([prop, val]) => ({
      name: prop,
      value: val,
    }));

export default {
  setup() {
    const colors = ref([]);
    onMounted(() => {
      colors.value = getCSSCustomPropIndex();
    });
    return {
      colors,
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
  &__figure {
    background-color: var(--color);
    border-radius: 2px 2px 0 0;
    display: block;
    height: 10rem;
  }
  &__details {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 10ch;
    font-size: 1.6rem;
  }
  &__input {
    border: 0;
    display: block;
    font-size: inherit;
    margin: 0;
    padding: 0.5rem;
    width: 100%;
  }
}
</style>
