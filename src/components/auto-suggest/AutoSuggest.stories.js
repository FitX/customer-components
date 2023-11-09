import { reactive, ref, watch } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import AutoSuggest from './AutoSuggest.vue';

const storyDescription = `
- @TODO
`;

export default {
  title: 'Components/AutoSuggest',
  component: AutoSuggest,
  argTypes: {
  },
  parameters: {
    jest: ['AutoSuggest.unit.spec.js'],
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
};


/**
 * Utils
 */
function fetchData(url) {
  // Simulate a network request by waiting for a specified amount of time
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Return a random array of data as a response
      // const data = [`0-${url}`, `1-${url}`, `2-${url}`, `3-${url}`, `4-${url}`].map((value) => ({ value }));
      const data = Array
        .from({ length: Math.floor(Math.random() * 11)})
        .map((item, index) => ({ value: `${index}-${url}` }));
      resolve(data);
    }, 300);
  });
}

/* ******************************** */
/// Templates
/* ******************************** */
/**
 * Info Box Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<auto-suggest
    label="Suche nach Buchstaben"
    :suggestions="demoSuggestions"
    id="demo-search-1"
    v-model="searchTerm"
    v-bind="args"></auto-suggest>`;

const withSlotsTemplate = `
<auto-suggest
    label="Suche"
    :suggestions="demoSuggestions"
    v-model="searchTerm"
    id="demo-search-2"
    :show-no-results="true"
    v-bind="args">
    <template
        v-if="demoSuggestions.length === 0"
        #fallback>
    Hier kann ein Hinweis kommen, wenn die Eingabe in der Sucheliste bisher noch nicht getätigt wurde und somit auch nicht erscheint.
    </template>
    <template
        v-else
        #item="{ item }">custom content {{ item.value }}</template>
</auto-suggest>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */

const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const searchTerm = ref('');
    const demoSuggestions = ref([]);
    watch(searchTerm, async (val) => {
      demoSuggestions.value = await fetchData(val);
    });
    return {
      args: reactive(args),
      demoSuggestions,
      searchTerm,
    };
  },
  components: {
    AutoSuggest,
  },
  template: baseTemplate,
});

const TemplateWithSlots = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const searchTerm = ref('');
    const demoSuggestions = ref([].map((value) => ({ value })));
    watch(searchTerm, async (val) => {
      demoSuggestions.value = await fetchData(val);
    });
    return {
      args: reactive(args),
      demoSuggestions,
      searchTerm,
    };
  },
  components: {
    AutoSuggest,
  },
  template: withSlotsTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultAutoSuggest = Template.bind({});
DefaultAutoSuggest.args = {};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {};
