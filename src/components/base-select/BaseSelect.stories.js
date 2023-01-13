import { reactive, computed, ref } from 'vue';
import { mapPropToArgTypes } from '../../../.storybook/helpers/manual-mapping-props-to-argtypes';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseSelect, {
  modifier,
  baseSelectProps,
} from './BaseSelect.vue';

const demoItems = [
  'FitX',
  'for',
  'all',
  'of',
  'us',
];

const storyDescription = `
- Breite variabel
- Kann man auf- und zuklappen
- Liste im Style des ausgespielten Systems
`;

export default {
  title: 'Components/Form/Dropdown',
  component: BaseSelect,
  argTypes: {
    ...mapPropToArgTypes(baseSelectProps),
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
  },
  parameters: {
    jest: ['BaseSelect.unit.spec.js'],
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
<base-select v-bind="args" v-model="args.model">
  <template v-if="args?.demo?.options" #items>
    <option
        v-for="demoOption in args?.demo?.options"
        :key="demoOption.value"
        :value="demoOption.value">{{ demoOption.text }}</option>
  </template>
</base-select>`;

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
  components: { BaseSelect },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBaseSelect = Template.bind({});
DefaultBaseSelect.args = {
  label: 'Label',
  items: demoItems,
};

export const BaseSelectHover = Template.bind({});
BaseSelectHover.args = {
  label: 'Label',
  model: 'for',
  modifier: 'fake-hover',
  items: demoItems,
};
BaseSelectHover.storyName = 'Hover';

export const BaseSelectFocused = Template.bind({});
BaseSelectFocused.args = {
  label: 'Label',
  modifier: 'fake-focus',
  items: demoItems,
};
BaseSelectFocused.storyName = 'Focused';

export const BaseSelectError = Template.bind({});
BaseSelectError.args = {
  label: 'Label',
  errorMessage: 'Das ist ein Pflichtfeld.',
  items: demoItems,
};
BaseSelectError.storyName = 'Error';

export const BaseSelectErrorFilled = Template.bind({});
BaseSelectErrorFilled.args = {
  label: 'Schwierig',
  model: 'all',
  errorMessage: 'Das Problem wird gleich behoben.',
  items: demoItems,
};
BaseSelectErrorFilled.storyName = 'Error Filled';

export const BaseSelectDisabled = Template.bind({});
BaseSelectDisabled.args = {
  label: 'Label',
  disabled: true,
};
BaseSelectDisabled.parameters = {
  docs: {
    description: {
      story: 'Disable als Attribut oder Modifier möglich.',
    },
  },
};
BaseSelectDisabled.storyName = 'Disabled';

export const BaseSelectDisabledPreFilled = Template.bind({});
BaseSelectDisabledPreFilled.args = {
  label: 'Label',
  model: 'FitX',
  disabled: true,
  items: demoItems,
};
BaseSelectDisabledPreFilled.storyName = 'Disabled Prefilled';

export const BaseSelectWithSlotOptions = Template.bind({});
BaseSelectWithSlotOptions.args = {
  label: 'Custom Options Structure',
  model: 456,
  demo: {
    options: [
      {
        value: 123,
        text: 'text 123',
      },
      {
        value: 456,
        text: 'text 456',
      },
    ],
  },
};
BaseSelectDisabledPreFilled.storyName = 'Disabled Prefilled';
