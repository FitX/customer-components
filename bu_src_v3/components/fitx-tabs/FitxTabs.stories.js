import { onMounted, reactive, ref, watch } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import FitxTabs from './FitxTabs.vue';

const storyDescription = `
- Ein Tab ist immer aktiv
- Tabbreite im gleichen Verhältnis
- Gesamte Breite variabel, manchmal so lang wie übergreifender Content
- Anzahl der Tabs variabel
`;

export default {
  title: 'Components/Tabs',
  component: FitxTabs,
  argTypes: {
  },
  parameters: {
    jest: ['FitxTabs.unit.spec.js'],
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
<fitx-tabs
    :tabs="demoTabs"
    v-bind="args"></fitx-tabs>`;

const slotsTemplate = `
<fitx-tabs
    id="slotted-tabs"
    :selected-tab="selectedTab"
    @selected="(index) => selectedTab = index"
    :tabs="demoTabs"
    v-bind="args">
    <template #tab="{ tab, index }">
        <span><b>{{ index }}</b>: {{ tab.title }}</span>
    </template>
    <template #tabpanel="{ tab, index }">
        <div
        class="demo-tabpanel"
        v-if="index === 0">
            <h1>Didn't melt fairer keepsakes since Fellowship elsewhere.</h1>
<p>Woodlands payment Osgiliath tightening. Barad-dur follow belly comforts tender tough bell? Many that live deserve death. Some that die deserve life. Outwitted teatime grasp defeated before stones reflection corset seen animals Saruman's call?</p>
<h2>Tad survive ensnare joy mistake courtesy Bagshot Row.</h2>
<p>Ligulas step drops both? You shall not pass! Tender respectable success Valar impressive unfriendly bloom scraped? Branch hey-diddle-diddle pony trouble'll sleeping during jump Narsil.</p>
<h3>North valor overflowing sort Iáve mister kingly money?</h3>
<p>Curse you and all the halflings! Deserted anytime Lake-town burned caves balls. Smoked lthilien forbids Thrain?</p>
<ul>
  <li>Adamant.</li>
  <li>Southfarthing!</li>
  <li>Witch-king.</li>
  <li>Precious.</li>
  <li>Gaffer's!</li>
</ul>
<ul>
  <li>Excuse tightening yet survives two cover Undómiel city ablaze.</li>
  <li>Keepsakes deeper clouds Buckland position 21 lied bicker fountains ashamed.</li>
  <li>Women rippling cold steps rules Thengel finer.</li>
  <li>Portents close Havens endured irons hundreds handle refused sister?</li>
  <li>Harbor Grubbs fellas riddles afar!</li>
</ul>
        </div>
        <div
        class="demo-tabpanel"
            v-if="index === 1">
        <h4>Afraid smithy Fellowship debt carven hooks.</h4>
<p>What about second breakfast? Nags runt near Lindir lock discover level? Andûril breathe waited flatten union.</p>
<h5>Should Shirelings extraordinary spends poison's willing enchantment.</h5>
<p>I think we should get off the road. Penalty sight splintered Misty Mountain mithril? Unrest lasts rode league bears absence Bracegirdle athletic contract nice parent slowed?</p>
</div>
<component v-cloak is="style" scoped>
b {
color: var(--brand-color-orange);
}
.demo-tabpanel {
padding: 2rem;
}
.demo-tabpanel:focus-visible {
border: 1px solid var(--brand-color-orange);
}

pre {
max-width:100%; wrap: break-word;}
</component>
    </template>
</fitx-tabs><p>Selected Tab: {{ selectedTab }}</p>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */

const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const demoTabs = [{ title: '1', content: 'content 1' }, { title: 'voll der lange titel weil wieder keiner bock hat sich damit zu beschäftigen 2', content: 'content 2' }, { title: 'drei', content: 'foo 3'}];
    return {
      args: reactive(args),
        demoTabs,
    };
  },
  components: {
    FitxTabs,
  },
  template: baseTemplate,
});

const TemplateWithSlots = (argsObject) => ({
    setup() {
        const args = argsObject;
        if (typeof args.isDarkMode === 'undefined') {
            args.isDarkMode = isDarkMode;
        }
        const demoTabs = [{
            title: 'Slotted Tab 1',
        }, {
            title: 'Slotted Tab 2',
        }]
        const selectedTab = ref(0);
        onMounted(() => {
          setTimeout(() => {
            selectedTab.value = 1;
          }, 600);
        })
        return {
            args: reactive(args),
            demoTabs,
            selectedTab,
        };
    },
    components: {
        FitxTabs,
    },
    template: slotsTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultTabs = Template.bind({});
DefaultTabs.args = {};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {};
