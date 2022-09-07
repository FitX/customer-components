import { reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import BannerNotification, {
  modifier,
} from './BannerNotification.vue';

const storyDescription = `
- Können flexibel im Content plaziert werden
- Breite variabel
- Nur klickbar mit Link
- Können nach Erscheinen eingeblendet bleiben
- Können nach x Sek wieder verschwinden
- Variante je nach Funktion frei wählbar (${modifier.join(', ')})
`;

export default {
  title: 'Components/Notifications',
  component: BannerNotification,
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
    jest: ['BannerNotification.unit.spec.js'],
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
<banner-notification v-bind="args">
  <template v-if="args?.slotProps?.default" #default><span v-html="args.slotProps.default"></span></template>
  <template v-if="args?.slotProps?.icon" #icon><span v-html="args.slotProps.icon"></span></template>
</banner-notification>`;

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
    BannerNotification,
  },
  template: baseTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const SuccessNotification = Template.bind({});
SuccessNotification.args = {
  modifier: 'success',
  slotProps: {
    default: 'Scheinbar alles in Ordnung',
  },
};

export const ErrorNotification = Template.bind({});
ErrorNotification.args = {
  modifier: 'error',
  slotProps: {
    default: 'Gehe nicht über los, ziehe keine 2000 Mark ein.',
  },
};

export const NotificationMultiLine = Template.bind({});
NotificationMultiLine.args = {
  modifier: 'error',
  slotProps: {
    default: 'Gehe nicht über Los, ziehe keine 2000 Mark ein.<br>Lorem Ipsum',
  },
};
