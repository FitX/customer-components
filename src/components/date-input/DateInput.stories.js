import { reactive } from 'vue';
import { mapPropToArgTypes } from '../../../.storybook/helpers/manual-mapping-props-to-argtypes';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import DateInput, {
  modifier,
  baseInputProps,
} from './DateInput.vue';

const storyDescription = `
## (Geburtstagsfelder)

- Breite variabel
- In erster Linie immer Pflichtfeld
- Wenn kein Pflichtfeld dann in Klammern (optional)
- Textfeld
- Punkte werden automatisch gesetzt, werden überschrieben, wenn sie selbst eingegeben werden

### Dev Info

Modifizierte Version der BaseInput Component zur Darstellung für Datum z.B. Geburtsdatum.

- Datum Model Format für prop.lang="de": **'dd.MM.yyyy'**
`;

const eventListener = {
  onInput: { action: 'onInput' },
  onUpdate: { action: 'onModelUpdate' },
  onBlur: { action: 'onBlur' },
  // onBlur: action('action'),
};

export default {
  title: 'Components/Form/Date Input',
  component: DateInput,
  argTypes: {
    ...eventListener,
    ...mapPropToArgTypes(baseInputProps),
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
  },
  parameters: {
    jest: ['DateInput.unit.spec.js'],
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
<date-input v-bind="args" v-model="args.model" :label="args.label || 'Geburtsdatum'">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</date-input>`;

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
  components: { DateInput },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultDateInput = Template.bind({});
DefaultDateInput.args = {
};
DefaultDateInput.storyName = 'Date Input';

export const DateInputHover = Template.bind({});
DateInputHover.args = {
  modifier: 'fake-hover',
};
DateInputHover.storyName = 'Hover';

export const DateInputFocused = Template.bind({});
DateInputFocused.args = {
  modifier: 'fake-focus',
};
DateInputFocused.storyName = 'focused';

export const DateInputValid = Template.bind({});
DateInputValid.args = {
  model: '11.08.1984',
  isValid: true,
};
DateInputValid.parameters = {
  docs: {
    description: {
      story: 'Vorausgefüllte Inputs müssen immer validiert werden.',
    },
  },
};
DateInputValid.storyName = 'valid';

export const DateInputError = Template.bind({});
DateInputError.args = {
  errorMessage: 'Das ist ein Pflichtfeld.',
};
DateInputError.storyName = 'Error';

export const DateInputErrorFilled = Template.bind({});
DateInputErrorFilled.args = {
  model: '11.08.1984',
  errorMessage: 'Das Datum ist ungültig.',
};
DateInputErrorFilled.storyName = 'Error Filled';

export const DateInputDisabled = Template.bind({});
DateInputDisabled.args = {
  disabled: true,
};
DateInputDisabled.parameters = {
  docs: {
    description: {
      story: 'Disable als Attribut oder Modifier möglich.',
    },
  },
};
DateInputDisabled.storyName = 'Disabled';

export const DateInputDisabledPreFilled = Template.bind({});
DateInputDisabledPreFilled.args = {
  model: '11.08.1984',
  disabled: true,
};
DateInputDisabledPreFilled.storyName = 'Disabled Prefilled';
