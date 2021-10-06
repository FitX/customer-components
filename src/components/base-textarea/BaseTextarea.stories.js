import { reactive } from 'vue';
import { mapPropToArgTypes } from '../../../.storybook/helpers/manual-mapping-props-to-argtypes';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseTextarea, {
  modifier,
  baseInputProps,
} from './BaseTextarea.vue';

const storyDescription = `
  Modifizierte Version der BaseInput Component zur Darstellung für längere Texte.
  **@TODO 2** Icons nicht final.
`;

const eventListener = {
  // onInput: { action: 'onInput' },
  'onUpdate:modelValue': { action: 'onModelUpdate' },
  // onBlur: { action: 'onBlur' },
  // onBlur: action('action'),
};

export default {
  title: 'Components/Form/Textarea',
  component: BaseTextarea,
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
    jest: ['BaseTextarea.unit.spec.js'],
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
<base-textarea v-bind="args" v-model="args.model" :label="args.label || 'Kommentar'" maxLength="200">
  <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
</base-textarea>`;

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
  components: { BaseTextarea },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBaseTextarea = Template.bind({});
DefaultBaseTextarea.args = {
};

export const BaseTextareaHover = Template.bind({});
BaseTextareaHover.args = {
  modifier: 'fake-hover',
};

export const BaseTextareaFocused = Template.bind({});
BaseTextareaFocused.args = {
  modifier: 'fake-focus',
};

export const BaseTextareaValid = Template.bind({});
BaseTextareaValid.args = {
  model: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Überlänge',
  isValid: true,
};
BaseTextareaValid.parameters = {
  docs: {
    description: {
      story: 'Vorausgefüllte Inputs müssen immer validiert werden.',
    },
  },
};

export const BaseTextareaError = Template.bind({});
BaseTextareaError.args = {
  errorMessage: 'Das ist ein Pflichtfeld.',
};

export const BaseTextareaDisabled = Template.bind({});
BaseTextareaDisabled.args = {
  disabled: true,
};
BaseTextareaDisabled.parameters = {
  docs: {
    description: {
      story: 'Disable als Attribut oder Modifier möglich.',
    },
  },
};

export const BaseTextareaDisabledPreFilled = Template.bind({});
BaseTextareaDisabledPreFilled.args = {
  model: 'Blubb',
  disabled: true,
};

export const InfoForDevs = () => ({
  components: {
    BaseTextarea,
  },
  data() {
    return {
      model: null,
    };
  },
  template: `
      <p>
      Die Textarea besteht aus der
      <a
        href="/?path=/docs/components-form-input--default-base-input">BaseInput</a> Komponente.
      zusätzlich kann eine Zeichenbegrenzung angezeigt werden.
      Die Komponente kann mit beliebigen Attributen wie z.B. <code>row=2</code> ergänzt werden.
      </p>
      <base-textarea
        label="Beispiel mit Spalten und ohne Auto Height"
        v-model="model"
        :disable-auto-height="true"
        rows="2" />
      `,
});

InfoForDevs.parameters = {
  docs: {
    description: {
      // story: 'Siehe Beschreibung.',
    },
  },
};
