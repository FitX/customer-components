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

const eventListener = {
  onSelected: () => console.log('selected'),
  onUnselected: () => console.log('unselected'),
};

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
/**
 * Base Button Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<base-option-form v-bind="args">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-option-form>`;

/**
 * Base Buttons Group Template
 * @type {string}
 */
const groupTemplate = `
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
  <base-option-form v-for="(button, index) in group" :key="index" v-bind="button.args" />
</div>`;

const groupTemplateSingle = `
<div>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
    <base-option-form
      v-for="(button, index) in group"
      :key="index"
      v-bind="button.args"
      :is-active="button.args.value === selectedOption"
      @unselected="setOptionModel(null)"
      @selected="setOptionModel(button.args.value)" />
  </div>
  <p v-if="selectedOption">selectedOption: {{ selectedOption }}</p>
</div>`;

const groupTemplateMultiple = `
<div>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
    <base-option-form
      v-for="(button, index) in group"
      :key="index"
      v-bind="button.args"
      :is-active="isActive(button.args.value)"
      @unselected="unSelect(button.args.value)"
      @selected="select(button.args.value)" />
  </div>
  <p v-if="selectedOption">selectedOption: {{ selectedOption }}</p>
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
      args: reactive({
        ...args,
        ...eventListener,
      }),
    };
  },
  components: { BaseOptionForm },
  template: baseTemplate,
});

/**
 * Group Template
 * @param {array} groupItems - vue props e.g. [{ args: {tag: 'button', text: 'Button', isDarkMode: false } }]
 * @return {{template: string, components: {BaseButton: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const TemplateGroup = (groupItems) => ({
  components: { BaseOptionForm },
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

const TemplateGroupSingle = (groupItems) => ({
  components: { BaseOptionForm },
  setup() {
    const group = groupItems.map((item) => {
      const itemCopy = item;
      if (typeof item.args.isDarkMode === 'undefined') {
        itemCopy.args.isDarkMode = isDarkMode;
      }
      return itemCopy;
    });
    const selectedOption = ref(null);
    const setOptionModel = (val) => {
      selectedOption.value = val;
    };
    return {
      group: reactive(group),
      selectedOption,
      setOptionModel,
    };
  },
  template: groupTemplateSingle,
});

const TemplateGroupMultiple = (groupItems) => ({
  components: { BaseOptionForm },
  setup() {
    const group = groupItems.map((item) => {
      const itemCopy = item;
      if (typeof item.args.isDarkMode === 'undefined') {
        itemCopy.args.isDarkMode = isDarkMode;
      }
      return itemCopy;
    });
    const selectedOption = reactive([]);
    const select = (val) => {
      // selectedOption.value.indexOf()
      selectedOption.push(val);
    };
    const unSelect = (val) => {
      const index = selectedOption.indexOf(val);
      console.log('index', index);
      selectedOption.splice(index, 1);
    };
    const isActive = (val) => selectedOption.includes(val);
    return {
      group: reactive(group),
      selectedOption,
      isActive,
      select,
      unSelect,
    };
  },
  template: groupTemplateMultiple,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBaseOption = Template.bind({});
DefaultBaseOption.args = {
  title: 'Base Option Form',
};
DefaultBaseOption.storyName = 'Option Form';

export const BaseOptionsForms = () => TemplateGroup([
  {
    args: {
      title: 'Option',
      ...eventListener,
    },
  },
  {
    args: {
      title: 'Option Hover',
      modifier: ['fake-hover'],
    },
  },
  {
    args: {
      title: 'Option Activated',
      isActive: true,
    },
  },
  {
    args: {
      title: 'Option Disabled',
      disabled: true,
    },
  },
  {
    args: {
      title: 'Error',
      modifier: 'error',
    },
  },
]);
BaseOptionsForms.storyName = 'Zustände';

export const BaseOptionsFormsSingle = () => TemplateGroupSingle([
  {
    args: {
      title: 'Option 1',
      value: 'option-1',
      ...eventListener,
    },
  },
  {
    args: {
      title: 'Option 2',
      value: 'option-2',
      ...eventListener,
    },
  },
]);
BaseOptionsFormsSingle.storyName = 'Single';

export const BaseOptionsFormsMultiple = () => TemplateGroupMultiple([
  {
    args: {
      title: 'Option 1',
      value: 'option-1',
      ...eventListener,
    },
  },
  {
    args: {
      title: 'Option 2',
      value: 'option-2',
      ...eventListener,
    },
  },
]);
BaseOptionsFormsMultiple.storyName = 'Multiple';
