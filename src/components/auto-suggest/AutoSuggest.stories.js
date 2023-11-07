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
    v-model="searchTerm"
    v-bind="args"></auto-suggest>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
/**
 * Default Template
 * @param {object} argsObject - vue props e.g. {tag: 'button', text: 'Button', isDarkMode: false }
 * @return {{template: string, components: {BaseButton: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }


    const searchTerm = ref('');

    const demoSuggestions = ref(['abcd', 'bcde', 'cdef']);

    function fetchData(url) {
      // Simulate a network request by waiting for a specified amount of time
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Return a random array of data as a response
          const data = [`0-${url}`, `1-${url}`, `2-${url}`, `3-${url}`, `4-${url}`];
          resolve(data);
        }, 3000);
      });
    }

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

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultAutoSuggest = Template.bind({});
DefaultAutoSuggest.args = {};
