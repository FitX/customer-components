import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import AccordionContent, {
  modifier,
} from './AccordionContent.vue';

const storyDescription = `
@TODO description
`;

export default {
  title: 'Components/Accordion',
  component: AccordionContent,
  argTypes: {
    modifier: {
      options: modifier,
      control: {
        type: 'select',
      },
    },
    // ...eventListener,
  },
  parameters: {
    jest: ['AccordionContent.unit.spec.js'],
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
<div style="font-size: 16px">
<accordion-content v-bind="args" v-model="args.model"></accordion-content>
</div>`;

const customTemplate = `
<accordion-content v-bind="args" v-model="args.model">
  <template #title0>
     title 0
  </template>
  <template #content0>
    <p>content 0</p>
  </template>
  <template #title1>
     title 1
  </template>
  <template #content1>
    <p>content 1</p>
  </template>
</accordion-content>`;

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
  components: {
    AccordionContent,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultAccordionContent = Template.bind({});
DefaultAccordionContent.args = {
  model: 1,
  id: 'demo',
  items: [
    {
    title: 'Title 1',
    content: 'Description',
    },
    {
      title: 'Title 2',
      content: 'Description 2',
    },
    {
      title: 'Title 3',
      content: 'Description 3',
    }
    ],
};
