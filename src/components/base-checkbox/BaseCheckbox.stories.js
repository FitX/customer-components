import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseCheckbox, {
  modifier,
} from './BaseCheckbox.vue';

const storyDescription = `
- siehe Zustände
- Immer in Verbindung mit Label / Text
`;

export default {
  title: 'Components/Form/Checkbox',
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
    jest: ['BaseCheckbox.unit.spec.js'],
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
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
<pre>{{ args.model }}</pre>
</small>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: grid; max-width: calc(3 * (20rem + 2rem)); grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1rem;">
<base-checkbox
    v-for="(item, index) in group"
    :key="index"
    v-bind="item.args"
    v-model="model">{{ item.args.label }}</base-checkbox>
</div>
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
<pre>Auswahl: {{ model }}</pre>
</small>
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
  inheritAttrs: false,
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
    const model = ref([
      'selected-disabled',
      'selected-error',
      'selected-focused',
      'selected',
    ]);
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
      isDarkMode,
    };
  },
  template: groupTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {};

// eslint-disable-next-line camelcase
export const Checkbox_with_TrueFalseValues = Template.bind({});
Checkbox_with_TrueFalseValues.args = {
  trueValue: 'checked',
  falseValue: 'not-checked',
  model: null,
};
Checkbox_with_TrueFalseValues.storyName = 'True / False Werte';
Checkbox_with_TrueFalseValues.parameters = {
  docs: {
    description: {
      story: 'Siehe [vue docs](https://v3.vuejs.org/guide/forms.html#checkbox-2)',
    },
  },
};

export const StateOverview = () => TemplateGroup([
  {
    args: {
      value: 'unselected',
      label: 'unselected',
    },
  },
  {
    args: {
      value: 'unselected-hover',
      modifier: 'fake-hover',
      label: 'unselected hover',
    },
  },
  {
    args: {
      value: 'unselected-disabled',
      disabled: 'disabled',
      label: 'unselected disabled',
    },
  },
  {
    args: {
      value: 'selected-disabled',
      disabled: 'disabled',
      // checked: true,
      label: 'selected disabled',
    },
  },
  {
    args: {
      value: 'unselected-error',
      label: 'unselected error',
      modifier: 'error',
    },
  },
  {
    args: {
      value: 'selected-error',
      modifier: 'error',
      // checked: true,
      label: 'selected error',
    },
  },
  {
    args: {
      value: 'unselected-focused',
      modifier: 'fake-focus',
      label: 'unselected focus',
    },
  },
  {
    args: {
      value: 'selected-focused',
      // checked: true,
      modifier: 'fake-focus',
      label: 'selected focus',
    },
  },
  {
    args: {
      value: 'selected',
      // checked: true,
      label: 'selected',
      isDarkMode,
    },
  },
]);
StateOverview.storyName = 'Zustände';
