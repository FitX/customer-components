import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import StatusNotification from './StatusNotification.vue';

const defaultOfflineText = `
Fehlende Verbindung – Sobald wieder eine Verbindung besteht kann die Seite geladen und die Funktion ausgeführt werden.
`;

const storyDescription = `
- zeigen Verbindungsstatus nach zweifachem Ampelsystem
- Grün = Verbindung
- Gelb = Keine Verbindung
- Gelb auch einzeln verwendbar
- beliebig platzierbar, immer sichtbar
- Text beliebig
`;

export default {
  title: 'Components/Status Notification',
  component: StatusNotification,
  argTypes: {
    modifier: {
      control: {
        type: 'multi-select',
      },
    },
    // ...eventListener,
  },
  parameters: {
    jest: ['StatusNotification.unit.spec.js'],
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
<status-notification
    v-bind="args"
    @is-online="triggerOnline(args.id)"
    @is-offline="triggerOffline(args.id)" />`;

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
    const triggerOnline = (id) => {
      console.log(`${id} is-online fired`);
    };
    const triggerOffline = (id) => {
      console.log(`${id} is-offline fired`);
    };
    return {
      args: reactive(args),
      triggerOnline,
      triggerOffline,
    };
  },
  components: {
    StatusNotification,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const WithThrottle2seconds = Template.bind({});
export const WithOfflineText = Template.bind({});
WithThrottle2seconds.args = {
  offlineThrottle: 2000,
  id: 1,
};

WithOfflineText.args = {
  offlineInfo: defaultOfflineText,
  id: 2,
};
