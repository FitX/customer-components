import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseButton, {
  modifier,
} from './BaseButton.vue';

export default {
  title: 'Components/Buttons/BaseButton',
  component: BaseButton,
  argTypes: {
    tag: {
      options: ['button', 'a'],
      control: {
        type: 'select',
      },
    },
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
    onClick: {},
  },
};

/// Templates
/**
 * Base Button Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<base-button v-bind="args">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-button>`;

const groupTemplate = `
  <div style="display: flex; gap: 1rem">
    <base-button v-for="(button, index) in group" :key="index" v-bind="button.args" :is-dark-mode="isDarkMode" />
  </div>
`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (!args.isDarkMode) {
      args.isDarkMode = isDarkMode;
    }
    return {
      args: reactive(args),
    };
  },
  components: { BaseButton },
  template: baseTemplate,
});

const TemplateGroup = (group) => ({
  components: { BaseButton },
  setup() {
    return {
      group,
      isDarkMode,
    };
  },
  template: groupTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultButton = Template.bind({});
DefaultButton.args = {
  tag: 'button',
  text: 'Button',
  // isDarkMode: false,
};
/**
 * Overwrite Default Button code
 * @type {{docs: {source: {code: string}}}}
 */
DefaultButton.parameters = {
  docs: {
    source: {
      code: '<base-button text="Button" />',
    },
  },
};

export const PrimaryAsLink = Template.bind({});
PrimaryAsLink.args = {
  tag: 'a',
  text: 'Primary as Link',
  // isDarkMode,,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  modifier: 'disabled',
  text: 'Primary disabled',
  // isDarkMode,,
};

export const PrimaryNativeDisabled = Template.bind({});
PrimaryNativeDisabled.args = {
  disabled: 'disabled',
  text: 'Primary disabled',
  // isDarkMode,,
};

export const WithSlot = Template.bind({});
WithSlot.args = {
  slotProps: {
    default: 'Text in Slot',
  },
  // isDarkMode,,
};

export const PrimaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      text: 'Primary Button',
      // isDarkMode,
    },
  },
  {
    args: {
      tag: 'button',
      disabled: true,
      text: 'Primary disabled',
      // isDarkMode,
    },
  },
]);

export const SecondaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      text: 'Secondary Button',
      // isDarkMode,
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      disabled: true,
      text: 'Secondary disabled',
      // isDarkMode,
    },
  },
]);
