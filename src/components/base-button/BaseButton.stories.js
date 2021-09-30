import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import exampleBackGroundImage from '../../../.storybook/example-background.png';
import BaseButton, {
  modifier,
} from './BaseButton.vue';

const storyDescription = `
  **Verwendung:**
  Base Button Component wird verwendet um **@TODO**
`;

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
  parameters: {
    jest: ['BaseButton.unit.spec.js'],
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


/**
 * Base Buttons Group Template with Background
 * @type {string}
 */
const groupTemplateBackground = `
<div style="padding: 2rem; display: grid; grid-template-columns: repeat(2, auto); justify-content: center; gap: 2rem; background: url(${exampleBackGroundImage})">
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

const TemplateGroupBackground = (group) => ({
  components: { BaseButton },
  setup() {
    return {
      group,
    };
  },
  template: groupTemplateBackground,
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

export const PrimaryButtons = () => TemplateGroup([
  {
    args: {
      text: 'Primary Button',
    },
  },
  {
    args: {
      text: 'Primary Hover',
      modifier: 'fake-hover',
    },
  },
  {
    args: {
      disabled: true,
      text: 'Primary disabled',
    },
  },
]);

export const PrimaryButtonsSmall = () => TemplateGroup([
  {
    args: {
      text: 'Small',
      modifier: 'small',
    },
  },
  {
    args: {
      text: 'Small Hover',
      modifier: ['small', 'fake-hover'],
    },
  },
  {
    args: {
      disabled: true,
      modifier: 'small',
      text: 'Small disabled',
    },
  },
]);

export const SecondaryButtons = () => TemplateGroup([
  {
    args: {
      modifier: 'secondary',
      text: 'Secondary Button',
    },
  },
  {
    args: {
      modifier: ['secondary', 'fake-hover'],
      text: 'Secondary Hover',
    },
  },
  {
    args: {
      modifier: 'secondary',
      disabled: true,
      text: 'Secondary disabled',
    },
  },
]);

export const SecondaryButtonsSmall = () => TemplateGroup([
  {
    args: {
      modifier: ['small', 'secondary'],
      text: 'Small',
    },
  },
  {
    args: {
      modifier: ['small', 'secondary', 'fake-hover'],
      text: 'Small Hover',
    },
  },
  {
    args: {
      modifier: ['small', 'secondary'],
      disabled: true,
      text: 'Small disabled',
    },
  },
]);

export const TertiaryButtons = () => TemplateGroup([
  {
    args: {
      modifier: 'tertiary',
      text: 'Tertiary Button',
    },
  },
  {
    args: {
      modifier: ['tertiary', 'fake-hover'],
      text: 'Tertiary Hover',
    },
  },
  {
    args: {
      modifier: 'tertiary',
      disabled: true,
      text: 'Tertiary disabled',
    },
  },
]);

TertiaryButtons.parameters = {
  docs: {
    description: {
      story: 'Die mögliche **Small Variante darf nicht benutzt** werden.',
    },
  },
};

export const QuaternaryButtons = () => TemplateGroupBackground([
  {
    args: {
      text: 'Primary Button',
    },
  },
  {
    args: {
      text: 'Primary Hover',
      modifier: 'fake-hover',
    },
  },
  {
    args: {
      modifier: 'quaternary',
      text: 'Quaternary Button',
    },
  },
  {
    args: {
      modifier: ['quaternary', 'fake-hover'],
      text: 'Quaternary Hover',
    },
  },
]);

QuaternaryButtons.parameters = {
  docs: {
    description: {
      story: 'Auf Hintergrund kommt primär der Primäry Button zum Einsatz. Sollte dieser nicht passen kann auch der Quaternary Button benutzt werden. Ein Einsatz von disable Styles ist nicht vorgesehen. **Hinweis:** Der Quaternary Button darf nicht Aseits eines Hintergrundes benutzt werden.',
    },
  },
};

export const QuaternaryButtonsSmall = () => TemplateGroupBackground([
  {
    args: {
      modifier: ['small', 'quaternary'],
      text: 'Small Quaternary',
    },
  },
  {
    args: {
      modifier: ['small', 'quaternary', 'fake-hover'],
      text: 'Small Quaternary Hover',
    },
  },
]);

QuaternaryButtonsSmall.parameters = {
  docs: {
    description: {
      story: 'Als Small Variante darf nur der Quaternary Button genutzt werden.',
    },
  },
};

/**
 * Specials
 */

export const InfoForDevs = () => ({
  template: 'Some Special Cases',
});

export const DisabledOptions = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      text: 'Native Disabled',
      disabled: true,
    },
  },
  {
    args: {
      tag: 'button',
      text: 'Modifier Disabled',
      modifier: 'disabled',
    },
  },
]);
DisabledOptions.parameters = {
  docs: {
    description: {
      story: 'Button kann nativ disabled werden `disabled=true` als auch per modifier `<base-button modifier="disabled" />`',
    },
  },
};

export const PrimaryAsLink = Template.bind({});
PrimaryAsLink.args = {
  tag: 'a',
  text: 'Primary as Link',
  // isDarkMode,,
};
PrimaryAsLink.parameters = {
  docs: {
    description: {
      story: 'Button kann auch als mit anderen Tags benutzt werden. `a, button` ... **Auf Zugänglichkeit achten.**',
    },
  },
};

export const WithSlot = Template.bind({});
WithSlot.args = {
  slotProps: {
    default: 'Text in Slot',
  },
};
WithSlot.parameters = {
  docs: {
    description: {
      story: 'Button kann via `text=👀` als auch per slot befüllt werden `<base-button>👀</base-button>`',
    },
  },
};
