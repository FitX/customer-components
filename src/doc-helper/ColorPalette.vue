<template>
  <section class="demo">
    <h1>Primäre Markenfarben</h1>
    <p>Unsere primären Markenfarben sind Weiß und Schwarz. Sie werden verwendet, um Zugänglichkeit, Einfachheit und Konsistenz in der gesamten Markenkommunikation zu gewährleisten.</p>
    <color-list :colors="primaryColors" />
  </section>

  <section class="demo">
    <h1>Sekundäre Markenfarben</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="primaryColors" />
  </section>

  <section class="demo">
    <h1>Anthrazitabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="anthraciteColors" />
  </section>

  <section class="demo">
    <h1>Orangeabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="orangeColors" />
  </section>

  <section class="demo">
    <h1>Weißabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="whiteColors" />
  </section>

  <section class="demo">
    <h1>Grauabstufungen</h1>
    <p>Das sind quasi die Farben der Formulare.</p>
    <color-list :colors="grayColors" />
  </section>

  <section class="demo">
    <h1>All Colors:</h1>
    <color-list :colors="colors" />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import ColorList from './ColorList.vue';

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
const getCSSCustomPropIndex = (filterString = '--brand-color') =>
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
          .filter(([propName]) => propName.indexOf(filterString) === 0);
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
  components: {
    ColorList,
  },
  setup() {
    const colors = ref([]);
    const primaryColors = ref([]);
    const secondaryColors = ref([]);
    const anthraciteColors = ref([]);
    const orangeColors = ref([]);
    const whiteColors = ref([]);
    const grayColors = ref([]);
    onMounted(() => {
      colors.value = getCSSCustomPropIndex();
      primaryColors.value = getCSSCustomPropIndex('--primary-brand-color');
      secondaryColors.value = getCSSCustomPropIndex('--secondary-brand-color');
      anthraciteColors.value = getCSSCustomPropIndex('--brand-color-anthracite');
      orangeColors.value = getCSSCustomPropIndex('--brand-color-orange');
      whiteColors.value = getCSSCustomPropIndex('--brand-color-white');
      grayColors.value = getCSSCustomPropIndex('--brand-color-gray');
    });
    return {
      colors,
      primaryColors,
      secondaryColors,
      anthraciteColors,
      orangeColors,
      whiteColors,
      grayColors,
    };
  },
};
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 4rem;
  p {
    max-width: 60ch;
  }
}
</style>
