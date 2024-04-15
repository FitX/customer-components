import { reactive, ref } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FitxRating, { directions } from './FitxRating.vue';

const storyDescription = `
- Zur Messung der Kundenzufriedenheit.
`;

export default {
  title: 'Components/Rating',
  component: FitxRating,
  argTypes: {
    numberOfVotes: {
      options: [3,5],
      control: {
        type: 'select',
      },
    },
    direction: {
      options: directions,
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
<fitx-rating
    @success="handleSuccess"
    v-bind="args"></fitx-rating>`;

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
    FitxRating,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultRating = Template.bind({});
DefaultRating.args = {};

export const RatingDone = Template.bind({});
RatingDone.args = {
  voted: 4,
};

export const RatingVertical = Template.bind({});
RatingVertical.args = {
  direction: 'column',
};
