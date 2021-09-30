import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FilterChip, {
  modifier,
} from './FilterChip.vue';

const storyDescription = `
  Filterchips verwenden Tags oder beschreibende Wörter, um Inhalte zu filtern.

  Filterchips grenzen die Optionen klar ab und zeigen sie in einem kompakten Bereich an.
  Sie sind eine gute Alternative zu Umschalttasten oder Kontrollkästchen.
`;

export default {
  title: 'Components/Filter Chips',
  component: FilterChip,
  argTypes: {
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
  },
  parameters: {
    jest: ['FilterChip.unit.spec.js'],
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
<filter-chip v-bind="args" v-model="args.model" />
<small :style="{ color: isDarkMode ? '#fff' : 'currentColor' }">
</small>
`;

/**
 * Group Checkbox Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: grid; max-width: calc(3 * (20rem + 2rem)); grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1rem;">
<filter-chip
    v-for="(item, index) in group"
    :key="index"
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
  <filter-chip
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
 * @return {{template: string, components: {FilterChip: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
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
  components: { FilterChip },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {FilterChip: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems, template = groupTemplate) => ({
  components: { FilterChip },
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

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultFilterChip = Template.bind({});
DefaultFilterChip.args = {
  label: 'Select',
  value: 'blubb',
  model: [],
  count: 2,
};

export const States = () => TemplateGroup([
  {
    args: {
      value: 'normal',
      label: 'Normal',
      count: 2,
    },
  },
  {
    args: {
      value: 'hover',
      modifier: 'fake-hover',
      count: 2,
      label: 'Hover',
    },
  },
  {
    args: {
      value: 'active',
      label: 'Active',
      count: 2,
    },
  },
]);

export const Usage = () => TemplateGroup([
  {
    args: {
      value: 1,
      label: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    args: {
      value: 2,
      count: 2,
      label: 'voluptua',
    },
  },
  {
    args: {
      value: 3,
      label: 'At vero eos et accusam',
    },
  },
  {
    args: {
      value: 4,
      label: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    args: {
      value: 5,
      count: 9,
      label: 'voluptua',
    },
  },
  {
    args: {
      label: 'At vero eos et accusam',
      count: 22,
    },
  },
], groupTemplateUsage);

Usage.parameters = {
  docs: {
    description: {
      story: '**Vorsicht:** Filter chips können in eine neue Reihe umbrochen werden. Wenn man jedoch zwei oder mehr Reihen mit Auswahlchips verwendet, kann es schwieriger sein, jeden Chip zu scannen.',
    },
  },
};
