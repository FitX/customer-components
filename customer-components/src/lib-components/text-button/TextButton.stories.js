import TextButton from './TextButton.vue';

export default {
  title: 'Buttons/TextButton',
  component: TextButton,
  argTypes: {
    tag: {
      options: ['button', 'a', 'div', 'span'],
      control: {
        type: 'select',
      },
    },
    modifier: {
      options: ['disabled'],
      control: {
        type: 'select',
      },
    },
    onClick: {},
  },
};

const Template = (args) => {
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { TextButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `<text-button v-bind="args">
    <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
    <template v-if="args?.slotProps?.icon" #icon>{{ args.slotProps.icon }}</template>
    </text-button>`,
  };
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  tag: 'button',
  text: 'Button',
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  tag: 'a',
  text: 'Button as Link',
};

export const Disabled = Template.bind({});
Disabled.args = {
  modifier: 'disabled',
  text: 'Button disabled',
};

export const WithSlot = Template.bind({});
WithSlot.args = {
  slotProps: {
    icon: ':)',
    default: 'Text in Slot',
  },
};
