import { reactive } from 'vue';
import { mapPropToArgTypes } from '../../../.storybook/helpers/manual-mapping-props-to-argtypes';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseInput, {
  modifier,
  baseInputProps,
} from './BaseInput.vue';

const storyDescription = `
  **Verwendung:**
  Base Input Component wird verwendet um **@TODO**

  **@TODO 2** Icons nicht final.
`;

export default {
  title: 'Components/Form/Input',
  component: BaseInput,
  argTypes: {
    ...mapPropToArgTypes(baseInputProps),
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
 * Base Button Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<base-input v-bind="args" v-model="args.model">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-input>`;

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
  components: { BaseInput },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBaseInput = Template.bind({});
DefaultBaseInput.args = {
  label: 'Label',
};

export const BaseInputHover = Template.bind({});
BaseInputHover.args = {
  label: 'Label',
  model: 'Demo Hover',
  modifier: 'fake-hover',
};

export const BaseInputFocused = Template.bind({});
BaseInputFocused.args = {
  label: 'Label',
  modifier: 'fake-focus',
};

export const BaseInputValid = Template.bind({});
BaseInputValid.args = {
  label: 'Label',
  model: 'Demo Valid/Activated',
  isValid: true,
};
BaseInputValid.parameters = {
  docs: {
    description: {
      story: 'Vorausgefüllte Inputs müssen immer validiert werden.',
    },
  },
};

export const BaseInputError = Template.bind({});
BaseInputError.args = {
  label: 'Label',
  errorMessage: 'Das ist ein Pflichtfeld.',
};

export const BaseInputErrorFilled = Template.bind({});
BaseInputErrorFilled.args = {
  label: 'Vorname',
  model: 'Error?',
  errorMessage: 'Dein Vorname ist ungültig.',
};

export const BaseInputDisabled = Template.bind({});
BaseInputDisabled.args = {
  label: 'Label',
  disabled: true,
};
BaseInputDisabled.parameters = {
  docs: {
    description: {
      story: 'Disable als Attribut oder Modifier möglich.',
    },
  },
};

export const BaseInputDisabledPreFilled = Template.bind({});
BaseInputDisabledPreFilled.args = {
  label: 'Label',
  model: 'Demo Disabled',
  disabled: true,
};

export const BaseInputClearable = Template.bind({});
BaseInputClearable.args = {
  label: 'Mitgliedsnummer',
  model: '123456',
  clearable: true,
};
BaseInputClearable.parameters = {
  docs: {
    description: {
      story: 'Über das clearable Attribute bekommt die Componente eine Löschfunktion. Eine Validierung soll nicht statt finden.',
    },
  },
}
