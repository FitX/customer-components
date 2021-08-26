import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseOption, {
  modifier,
} from './BaseOption.vue';

const storyDescription = `
  **Verwendung:**
  Base Option Component wird verwendet um **@TODO**
  Aber auf gar keinen Fall in Forms, Dafür gibt es dann wieder eine eigene Komponente die genauso ist nur in klein, dafür mit Error State.
`;

export default {
  title: 'Components/BaseOption',
  component: BaseOption,
  argTypes: {
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
    onClick: {},
  },
  parameters: {
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
<base-option v-bind="args">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-option>`;

/**
 * Base Buttons Group Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
  <base-option v-for="(button, index) in group" :key="index" v-bind="button.args" />
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
  components: { BaseOption },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseButton: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems) => ({
  components: { BaseOption },
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
export const DefaultBaseOption = Template.bind({});
DefaultBaseOption.args = {
  title: 'Option',
};

export const BaseOptions = () => TemplateGroup([
  {
    args: {
      title: 'Option',
    },
  },
  {
    args: {
      title: 'Option Hover',
      modifier: 'fake-hover',
    },
  },
  {
    args: {
      title: 'Option Activated',
      modifier: 'active',
    },
  },
  {
    args: {
      title: 'Option Disabled',
      disabled: true,
    },
  },
]);

export const BaseOptionsExtra = () => TemplateGroup([
  {
    args: {
      title: 'Option',
      text: 'Additional',
      modifier: ['extra'],
    },
  },
  {
    args: {
      title: 'Option Hover',
      text: 'Additional',
      modifier: ['extra', 'fake-hover'],
    },
  },
  {
    args: {
      title: 'Option Activated',
      text: 'Additional',
      modifier: ['extra', 'active'],
    },
  },
  {
    args: {
      title: 'Option Disabled',
      text: 'Additional',
      modifier: ['extra'],
      disabled: true,
    },
  },
]);

export const BaseOptionsSmall = () => TemplateGroup([
  {
    args: {
      title: 'Option',
      modifier: 'small',
    },
  },
  {
    args: {
      title: 'Option Hover',
      modifier: ['small', 'fake-hover'],
    },
  },
  {
    args: {
      title: 'Option Activated',
      modifier: ['small', 'active'],
    },
  },
  {
    args: {
      title: 'Option Disabled',
      modifier: 'small',
      disabled: true,
    },
  },
]);
