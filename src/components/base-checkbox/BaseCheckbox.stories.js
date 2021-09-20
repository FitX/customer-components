import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseCheckbox, {
  modifier,
} from './BaseCheckbox.vue';

const storyDescription = `
  **Verwendung:**
  Base Button Component wird verwendet um **@TODO**
`;

export default {
  title: 'Components/BaseCheckbox',
  component: BaseCheckbox,
  argTypes: {
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
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
 * Base Checkbox Template
 * @type {string}
 */
const baseTemplate = `
<base-checkbox v-bind="args" v-model="args.model" />
<p>{{ args.model }}</p>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplate = `
<base-checkbox
    v-for="(item, index) in items"
    :key="index"
    v-bind="item.args"
    v-model="model" />
<p>Model: {{ model }}</p>
`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
/**
 * Default Template
 * @param {object} argsObject - vue props e.g. {tag: 'button', text: 'Button', isDarkMode: false }
 * @return {{template: string, components: {BaseCheckbox: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
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
  components: { BaseCheckbox },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseCheckbox: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems) => ({
  components: { BaseCheckbox },
  setup() {
    const model = ref(null);
    const group = groupItems.map((item) => {
      const itemCopy = item;
      if (typeof item.args.isDarkMode === 'undefined') {
        itemCopy.args.isDarkMode = isDarkMode;
      }
      return itemCopy;
    });
    return {
      group: reactive(group),
      model,
    };
  },
  template: groupTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {};

export const TrueFalseValuesCheckbox = Template.bind({});
TrueFalseValuesCheckbox.args = {
  trueValue: 'checked',
  falseValue: 'not-checked',
  model: null,
};
