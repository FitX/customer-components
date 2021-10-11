import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BaseBanner, {
  modifier,
} from './BaseBanner.vue';

const storyDescription = `
- Werden so hoch wie möglich platziert
- Breite wie Seite
- Links und Icons sind optional
- Variante je nach Funktion frei wählbar (${modifier.join(', ')})
`;

export default {
  title: 'Components/Banner',
  component: BaseBanner,
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
    jest: ['BaseBanner.unit.spec.js'],
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
<base-banner v-bind="args">
  <template v-if="args?.slotProps?.default" #default><span v-html="args.slotProps.default"></span></template>
  <template v-if="args?.slotProps?.icon" #icon><span v-html="args.slotProps.icon"></span></template>
</base-banner>`;

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
    BaseBanner,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultBanner = Template.bind({});
DefaultBanner.args = {
  slotProps: {
    default: 'Lorem Ipsum dolor sit amet diam et.',
  },
};

export const AttentionBanner = Template.bind({});
AttentionBanner.args = {
  modifier: 'attention',
  slotProps: {
    default: 'Lorem Ipsum dolor sit amet diam et.',
  },
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  modifier: 'no-icon',
  content: 'Lorem Ipsum dolor sit amet diam et.',
};

const alternateIcon = `<svg width="18" height="18" viewBox="0 0 18 13" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M0-2h18v18H0z"/>
    <path d="M13.788.663a2.867 2.867 0 0 0-2.765 2.128H.727a.71.71 0 1 0 0 1.418h10.296a2.867 2.867 0 0 0 2.765 2.128 2.867 2.867 0 0 0 2.764-2.128h.721a.71.71 0 1 0 0-1.418h-.721A2.867 2.867 0 0 0 13.788.663Zm0 1.419a1.41 1.41 0 0 1 1.425 1.354 1.01 1.01 0 0 0 0 .13 1.41 1.41 0 0 1-1.425 1.352 1.41 1.41 0 0 1-1.426-1.354 1.01 1.01 0 0 0 0-.13 1.41 1.41 0 0 1 1.426-1.352ZM5.426 7.326a2.867 2.867 0 0 0-2.764 2.128H.727a.71.71 0 1 0 0 1.418h1.935A2.867 2.867 0 0 0 5.426 13a2.867 2.867 0 0 0 2.764-2.128h9.083a.71.71 0 1 0 0-1.418H8.19a2.867 2.867 0 0 0-2.764-2.128Zm0 1.419a1.41 1.41 0 0 1 1.425 1.354 1.01 1.01 0 0 0 0 .13 1.41 1.41 0 0 1-1.425 1.353A1.41 1.41 0 0 1 4 10.227a1.01 1.01 0 0 0 0-.13 1.41 1.41 0 0 1 1.426-1.352Z" fill="var(--icon-fill, #181D1E)" fill-rule="nonzero"/>
  </g>
</svg>`;

const htmlDemoContent = `<b>Endlich wieder FitX!</b> Alle Infos und was du beachten musst, findest du hier: <a href="javascript:;">fitx.de/corona</a>.`;
export const HTMLContent = Template.bind({});
HTMLContent.args = {
  style: {
    '--base-banner-icon-fill': '#181D1E',
  },
  modifier: ['attention', 'left'],
  onClick: () => window.alert('Box ist klickbar'),
  slotProps: {
    default: htmlDemoContent,
    icon: alternateIcon,
    // icon: 'foo',
  },
};
HTMLContent.parameters = {
  docs: {
    description: {
      story: 'Content via Default-Slot mit alternativen Icon via Icon-Slot. Klick Handling findet in den Apps statt.',
    },
  },
};
