import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FitxBadge from './FitxBadge.vue';

const storyDescription = `
- werden in Versalien geschrieben
- Breite passt sich dem Inhalt an
- können einzeln und zusammen verwendet werden
- werden nebeneinander und dann mehrzeilig angezeigt
- Farbe je nach Funktion frei wählbar
`;

export default {
  title: 'Components/Badges/Badge',
  component: FitxBadge,
  argTypes: {
    status: {
      options: Array.from({ length: 4 }, (_, index) => index + 1),
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    jest: ['FitxBadge.unit.spec.js'],
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
const baseTemplate = `
<fitx-badge v-bind="args" v-model="args.model"></fitx-badge>
`;

const groupTemplate = `
<div style="display: flex; gap: 1rem;">
<fitx-badge
    v-for="(item, index) in group"
    :key="index"
    v-bind="item.args" />
</div>
`;

const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    return {
      args: reactive(args),
      isDarkMode,
    };
  },
  components: { FitxBadge },
  template: baseTemplate,
});

const TemplateGroup = (groupItems, template = groupTemplate) => ({
  components: { FitxBadge },
  setup() {
    const group = groupItems.map((item) => {
      const itemCopy = item;
      if (typeof item.args.isDarkMode === 'undefined') {
        itemCopy.args.isDarkMode = isDarkMode;
      }
      return itemCopy;
    });
    return {
      group: reactive(group),
      isDarkMode,
    };
  },
  template,
});


//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultFitxBadge = Template.bind({});
DefaultFitxBadge.args = {
  value: 'Badge',
  status: 1,
};

DefaultFitxBadge.storyName = 'Badge'

export const States = () => TemplateGroup([
  {
    args: {
      value: 'Badge 1',
      status: 1,
    },
  },
  {
    args: {
      value: 'Badge 2',
      status: 2,
    },
  },
  {
    args: {
      value: 'Badge 3',
      status: 3,
    },
  },
  {
    args: {
      value: 'Badge 4',
      status: 4,
    },
  },
]);
States.storyName = 'Status';
