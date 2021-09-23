import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseRadio, {
  modifier,
} from './BaseRadio.vue';

const storyDescription = `
  **Verwendung:**
  Base Radio Component wird verwendet um **@TODO**
`;

export default {
  title: 'Components/BaseRadio',
  component: BaseRadio,
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
<base-radio v-bind="args" v-model="args.model" />
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
</small>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: grid; max-width: calc(3 * (20rem + 2rem)); grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1rem;">
<base-radio
    v-for="(item, index) in group"
    :key="index"
    v-bind="item.args"
    v-model="data[item.args.value]">{{ item.args.label }}</base-radio>
</div>
`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
/**
 * Default Template
 * @param {object} argsObject - vue props e.g. {tag: 'button', text: 'Button', isDarkMode: false }
 * @return {{template: string, components: {BaseRadio: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
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
  components: { BaseRadio },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseRadio: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems) => ({
  components: { BaseRadio },
  setup() {
    const group = groupItems.map((item) => {
      const itemCopy = item;
      if (typeof item.args.isDarkMode === 'undefined') {
        itemCopy.args.isDarkMode = isDarkMode;
      }
      return itemCopy;
    });
    /**
     * Focus selected model State by compare group item values with this model
     */
    const data = reactive({
      selected: 'selected',
      'selected-focused': 'selected-focused',
      'selected-disabled': 'selected-disabled',
      'selected-error': 'selected-error',
    });
    return {
      group: reactive(group),
      data,
    };
  },
  template: groupTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  value: 'selected',
};

const stateGroup = [
  {
    args: {
      value: 'unselected',
      label: 'Unselected',
    },
  },
  {
    args: {
      value: 'unselected-hover',
      modifier: ['fake-hover'],
      label: 'Unselected hover',
    },
  },
  {
    args: {
      value: 'unselected-disabled',
      disabled: 'disabled',
      label: 'Unselected disabled',
    },
  },
  {
    args: {
      value: 'selected-disabled',
      disabled: 'disabled',
      label: 'Selected disabled',
    },
  },
  {
    args: {
      value: 'unselected-error',
      label: 'Unselected error',
      modifier: ['error'],
    },
  },
  {
    args: {
      value: 'selected-error',
      modifier: ['error'],
      label: 'Selected error',
    },
  },
  {
    args: {
      value: 'unselected-focused',
      modifier: ['fake-focus'],
      label: 'Unselected focus',
    },
  },
  {
    args: {
      value: 'selected-focused',
      modifier: ['fake-focus'],
      label: 'Selected focus',
    },
  },
  {
    args: {
      value: 'selected',
      label: 'Selected',
      isDarkMode,
    },
  },
];

const stateGroupButtonStyle = stateGroup.map((item) => {
  const { args } = item;
  const { modifier: itemModifier = [] } = args;
  const mappedModifier = [...itemModifier, 'button'];
  return {
    ...item,
    args: {
      ...args,
      modifier: mappedModifier,
    },
  };
});

export const StateOverview = () => TemplateGroup(stateGroup);
export const StateOverviewButtonStyle = () => TemplateGroup(stateGroupButtonStyle);
StateOverviewButtonStyle.parameters = {
  docs: {
    description: {
      story: 'Für GymX Projekte wird immer der "button"-Modifier benutzt.',
    },
  },
};

export const Radio_with_Form_Modifier = () => ({
  components: { BaseRadio },
  setup() {
    const gender = ref('divers');
    const genderItems = ['Divers', 'Female', 'Male'];
    return {
      genderItems,
      gender,
      isDarkMode,
    };
  },
  template: `
    <div style="display: grid; max-width: calc(3 * (20rem + 2rem)); grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1rem;">
<base-radio
  v-model="gender"
  v-for="item in genderItems"
  :is-dark-mode="isDarkMode"
  :key="item"
  :label="item"
  :value="item"
  modifier="button"
/>
    </div>`,
});
