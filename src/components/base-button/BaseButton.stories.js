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

/* ******************************** */
/// Templates
/* ******************************** */
/**
 * Base Button Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<base-button v-bind="args">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-button>`;

/**
 * Base Buttons Group Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
  <base-button v-for="(button, index) in group" :key="index" v-bind="button.args" />
</div>`;

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
    return {
      args: reactive(args),
    };
  },
  components: { BaseButton },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseButton: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems) => ({
  components: { BaseButton },
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
  isDarkMode: false,
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
