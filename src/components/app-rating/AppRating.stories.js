import { reactive, ref } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import AppRating from './AppRating.vue';

const storyDescription = `
- Zur Messung der Kundenzufriedenheit.
- Deprecated weil einfache Implementierung gewünscht ist -> siehe Rating Component
`;

export default {
  title: 'Components/Deprecated/AppRating',
  component: AppRating,
  argTypes: {
    numberOfVotes: {
      options: [3,5],
      control: {
        type: 'select',
      },
    },
    // ...eventListener,
  },
  parameters: {
    jest: ['AppRating.unit.spec.js'],
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
<app-rating
    style="text-align:center; display: grid; place-items: center; margin: 0 auto;"
    @success="handleSuccess"
    v-bind="args"></app-rating>`;

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
    const handleSuccess = (count) => {
      console.log('count', count);
    };
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    return {
      args: reactive(args),
      handleSuccess,
    };
  },
  components: {
    AppRating,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultRating = Template.bind({});
DefaultRating.args = {};

export const RatingWithTitle = Template.bind({});
RatingWithTitle.args = {
  title: 'Wie zufrieden bist du mit dem Anmeldeprozess?',
  voted: 4,
};
