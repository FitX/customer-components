import { reactive, ref } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import ProgressBar from './ProgressBar.vue';

const storyDescription = `
** Verhalten **

- Füllende Animation

** Benutzung in Anwendungen **

- Nur der Aktive und die Abgeschlossenen Steps sollen klickbar sein
`;

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    jest: ['ProgressBar.unit.spec.js'],
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
 * Info Box Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<div>
<progress-bar v-bind="args" @StepSelected="handleClick" :current-step-index="currentIndex" />
</div>
`;

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
    const currentIndex = ref(args.currentStepIndex);
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    function handleClick(index) {
      currentIndex.value = index;
    }
    return {
      args: reactive(args),
      currentIndex,
      handleClick,
    };
  },
  components: {
    ProgressBar,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultProgressBar = Template.bind({});
DefaultProgressBar.args = {
  currentStepIndex: 0,
  steps: [
    'Studio auswählen',
    'Termin auswählen',
    'Trainingsziel',
    'Bemerkungen',
    'Fertig',
  ],
};
