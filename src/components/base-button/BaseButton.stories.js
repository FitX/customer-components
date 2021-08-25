import { TemplateWrapper } from '../../../.storybook/template-helpers/custom-templates';
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
    /* isDarkMode: {
      control: {
        type: 'boolean',
      },
    }, */
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

/// Story Wrapper
/**
 * Default Story Template Wrapper
 * @param args
 * @param additionalSetup
 * @return {{template, components, setup(): {args: *, isDarkMode: (ComputedRef<boolean>|WritableComputedRef<*>)}}|{args, isDarkMode: ComputedRef<boolean>}}
 * @constructor
 */
const Template = (args, additionalSetup) => TemplateWrapper({
  args,
  additionalSetup,
  components: { BaseButton },
  template: baseTemplate,
});

/// Stories
export const DefaultButton = Template.bind({});
DefaultButton.args = {
  tag: 'button',
  text: 'Button',
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
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  modifier: 'disabled',
  text: 'Primary disabled',
};

export const PrimaryNativeDisabled = Template.bind({});
PrimaryNativeDisabled.args = {
  disabled: 'disabled',
  text: 'Primary disabled',
};

export const WithSlot = Template.bind({});
WithSlot.args = {
  slotProps: {
    default: 'Text in Slot',
  },
};

const groupTemplate = `
  <div style="display: flex; gap: 1rem">
    <base-button
    v-for="(button, index) in PrimaryGroupItems"
    :key="index"
    v-bind="{ ...button.args, ...args }" />
  </div>
`;
const TemplateGroup = (args, additionalSetup) => TemplateWrapper({
  args,
  additionalSetup,
  components: { BaseButton },
  template: groupTemplate,
});

export const PrimaryButtons = () => TemplateGroup({}, {
  PrimaryGroupItems: [
    {
      args: {
        tag: 'button',
        text: 'Primary Button',
      },
    },
    {
      args: {
        tag: 'button',
        disabled: true,
        text: 'Primary disabled',
      },
    },
  ],
});








const Template2 = (args) => {
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { BaseButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `<base-button v-bind="args">
    <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
    </base-button>`,
  };
};

export const Defaul2tButton = Template2.bind({});
Defaul2tButton.args = {
  tag: 'button',
  text: 'blubb',
  isDarkMode,
};

const TemplateGroup2 = (group) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { group };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="display: flex; gap: 1rem">
      <base-button v-for="(button, index) in group" :kex="index" v-bind="button.args" />
    </div>
  `,
});

export const PrimaryButtons2 = () => TemplateGroup2([
  {
    args: {
      tag: 'button',
      text: 'Primary Button',
      isDarkMode,
    },
  },
  {
    args: {
      tag: 'button',
      disabled: true,
      text: 'Primary disabled',
      isDarkMode,
    },
  },
]);

export const SecondaryButtons2 = () => TemplateGroup2([
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      text: 'Secondary Button',
      isDarkMode,
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      disabled: true,
      text: 'Secondary disabled',
      isDarkMode,
    },
  },
]);
