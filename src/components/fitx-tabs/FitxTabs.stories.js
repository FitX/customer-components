import { reactive, ref, watch } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FitxTabs from './FitxTabs.vue';

const storyDescription = `
- Ein Tab ist immer aktiv
- Tabbreite im gleichen Verhältnis
- Gesamte Breite variabel, manchmal so lang wie übergreifender Content
- Anzahl der Tabs variabel
`;

export default {
  title: 'Components/Tabs',
  component: FitxTabs,
  argTypes: {
  },
  parameters: {
    jest: ['FitxTabs.unit.spec.js'],
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
<fitx-tabs
    v-model="searchTerm"
    v-bind="args"></fitx-tabs>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */

const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    return {
      args: reactive(args),
    };
  },
  components: {
    FitxTabs,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultTabs = Template.bind({});
DefaultTabs.args = {};
