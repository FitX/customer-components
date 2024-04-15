import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FitxNotificationBadge from './FitxNotificationBadge.vue';

const storyDescription = `
- nur Zahlen
- benutzung: maximal Zweistellig (Validierung im Projekt)
`;

export default {
  title: 'Components/Badges/NotificationBadge',
  component: FitxNotificationBadge,
  argTypes: {
    status: {
      options: Array.from({ length: 4 }, (_, index) => index + 1),
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    jest: ['FitxNotificationBadge.unit.spec.js'],
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
<fitx-notification-badge v-bind="args" v-model="args.model"></fitx-notification-badge>
`;

const groupTemplate = `
<div style="display: flex; gap: 1rem;">
<fitx-notification-badge
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
  components: { FitxNotificationBadge },
  template: baseTemplate,
});

const TemplateGroup = (groupItems, template = groupTemplate) => ({
  components: { FitxNotificationBadge },
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
export const DefaultFitxNotificationBadge = Template.bind({});
DefaultFitxNotificationBadge.args = {
  value: 42,
  status: 1,
};

DefaultFitxNotificationBadge.storyName = 'Notification Badge'

export const States = () => TemplateGroup([
  {
    args: {
      value: 1,
      status: 1,
    },
  },
  {
    args: {
      value: 2,
      status: 2,
    },
  },
  {
    args: {
      value: 3,
      status: 3,
    },
  },
  {
    args: {
      value: 4,
      status: 4,
    },
  },
]);
States.storyName = 'Status';
