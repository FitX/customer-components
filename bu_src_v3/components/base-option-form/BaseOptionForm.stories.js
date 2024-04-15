import FilterChip from '@/components/filter-chip/FilterChip';
import { reactive, ref } from 'vue';
// import { action } from '@storybook/addon-actions';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseOptionForm, {
  modifier,
} from './BaseOptionForm.vue';

const storyDescription = `
- werden nebeneinander angeordnet
- Einfach- und Mehrfach auswahl möglich
- werden in Forms verwendet
`;


export default {
  title: 'Components/Option Form',
  component: BaseOptionForm,
  argTypes: {
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
    // ...eventListener,
  },
  parameters: {
    jest: ['BaseOptionForm.unit.spec.js'],
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
/* ******************************** */
/// Templates
/* ******************************** */
/**
 * Base Checkbox Template
 * @type {string}
 */
const baseTemplate = `
<base-option-form v-bind="args" v-model="args.model" />
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
</small>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: grid; max-width: calc(3 * (20rem + 2rem)); grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1rem;">
<base-option-form
    v-for="(item, index) in group"
    :key="index"
    name="group"
    v-bind="item.args"
    v-model="model" />
</div>
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
<pre>Auswahl: {{ model }}</pre>
</small>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplateUsage = `
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <base-option-form
    v-for="(item, index) in group"
    :key="index"
    v-bind="item.args"
    v-model="model" />
</div>
`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
/**
 * Default Template
 * @param {object} argsObject - vue props e.g. {tag: 'button', text: 'Button', isDarkMode: false }
 * @return {{template: string, components: {BaseOptionForm: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
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
  components: { BaseOptionForm },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseOptionForm: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems, template = groupTemplate) => ({
  components: { BaseOptionForm },
  setup() {
    const model = ref([
      'active',
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
  template,
});

/**
 * Group Template Single
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseOptionForm: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroupSingle = (groupItems, template = groupTemplate) => ({
  components: { BaseOptionForm },
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
      isDarkMode,
    };
  },
  template,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBaseOptionForm = Template.bind({});
DefaultBaseOptionForm.args = {
  title: 'Base Option Form',
  value: 'blubb',
  model: [],
};

export const States = () => TemplateGroup([
  {
    args: {
      value: 'normal',
      title: 'Option',
    },
  },
  {
    args: {
      value: 'hover',
      modifier: 'fake-hover',
      title: 'Option Hover',
    },
  },
  {
    args: {
      value: 'active',
      title: 'Option Active',
    },
  },
  {
    args: {
      value: 'disabled',
      disabled: true,
      title: 'Option Disabled',
    },
  },
  {
    args: {
      value: 'error',
      modifier: 'error',
      title: 'Option Error',
    },
  },
]);
States.storyName = 'Zustände';

export const Usage = () => TemplateGroup([
  {
    args: {
      value: 'active',
      title: 'Eins',
    },
  },
  {
    args: {
      value: 'active 2',
      title: 'Zwei',
    },
  },
  {
    args: {
      value: 'active 3',
      title: 'Drei',
    },
  },
  {
    args: {
      value: 'active 4',
      title: 'Vier',
    },
  },
  {
    args: {
      value: 'active 5',
      title: 'Fünf',
    },
  },
], groupTemplate);

Usage.parameters = {
  docs: {
    description: {
      story: 'Mehrfachauswahl ist Standard.',
    },
  },
};

Usage.storyName = 'Benutzung';

export const UsageSingle = () => TemplateGroupSingle([
  {
    args: {
      value: 1,
      title: 'Eins',
    },
  },
  {
    args: {
      value: 2,
      title: 'Zwei',
    },
  },
  {
    args: {
      value: 3,
      title: 'Drei',
    },
  },
  {
    args: {
      value: 4,
      title: 'Vier',
    },
  },
  {
    args: {
      value: 5,
      title: 'Fünf',
    },
  },
], groupTemplate);

UsageSingle.parameters = {
  docs: {
    description: {
      story: 'Alternative Single Auswahl.',
    },
  },
};

UsageSingle.storyName = 'Benutzung Single';

