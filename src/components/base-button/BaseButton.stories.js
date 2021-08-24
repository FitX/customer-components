import { getCurrentInstance, ref, computed } from 'vue';
import addons from '@storybook/addons';
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

const Template = (args, context) => {
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { BaseButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup(props) {
      const selectedTheme = ref(undefined);
      const isDarkMode = computed(() => selectedTheme.value === 'fitx-dark');
      const instance = getCurrentInstance();
      console.log('context', context);
      console.log('instance', instance.parent.parent);
      const channel = addons.getChannel();
      channel.on('storybook-addon-themes/change', (name) => {
        selectedTheme.value = name;
      })
      console.log('addons.getChannel()', addons.getChannel());
      // const { backgrounds } = context.globals;
      return {
        args,
        isDarkMode,
        // backgrounds,
      };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `<base-button v-bind="args">{{ isDarkMode }}
    <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
    </base-button>`,
  };
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  tag: 'button',
  text: 'Button',
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

export const Secondary = Template.bind({});
Secondary.args = {
  modifier: 'secondary',
  text: 'Secondary',
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  modifier: ['secondary', 'disabled'],
  text: 'Secondary disabled',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  modifier: 'tertiary',
  text: 'Tertiary',
};

export const TertiaryDisabled = Template.bind({});
TertiaryDisabled.args = {
  modifier: ['tertiary', 'disabled'],
  text: 'Tertiary disabled',
};

const PrimaryGroupItems = [
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
];

export const PrimaryGroup = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { PrimaryGroupItems };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="display: flex; gap: 1rem">
      <base-button v-for="(button, index) in PrimaryGroupItems" :kex="index" v-bind="button.args" />
    </div>
  `,
});

const TemplateGroup = (group) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const prefersDark = typeof window !== 'undefined'
      ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
    return {
      group,
      prefersDark,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="display: flex; gap: 1rem">
    {{ prefersDark }}
      <base-button v-for="(button, index) in group" :kex="index" v-bind="button.args" />
    </div>
  `,
});

export const PrimaryButtons = () => TemplateGroup([
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
]);

export const SecondaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      text: 'Secondary Button',
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      disabled: true,
      text: 'Secondary disabled',
    },
  },
]);

export const TertiaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      modifier: 'tertiary',
      text: 'Tertiary Button',
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'tertiary',
      disabled: true,
      text: 'Tertiary disabled',
    },
  },
]);
