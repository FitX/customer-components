import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import { FitxButton, buttonStates } from './index';
import { IconClose } from '@/components/icons/index';
import { computed } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Button',
  component: FitxButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    modifier: { control: 'multi-select', options: [...buttonStates] },
    // size: { control: 'select', options: ['small', 'default'] },
  },
  args: {
    default: 'FitX Button',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof FitxButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    modifier: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    modifier: 'secondary',
  },
  parameters: {
    /* controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },*/
  },
};

export const Tertiary: Story = {
  args: {
    modifier: 'tertiary',
  },
};

export const Quaternary: Story = {
  args: {
    modifier: 'quaternary',
  },
};

export const Overview: Story = {
  args: {
    // size: 'default',
  },
  parameters: {
    docs: {
      // story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      // source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxButton,
    },
    setup() {
      return {
        theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        section, .demo {
          --demo-text-color: inherit;
          &:is([data-theme=dark]) {
            --demo-text-color: white;
          }

          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-block-end: 3rem;
          color: var(--demo-text-color);
          & p { margin: 0 }
          & h1 {
            flex: 1 0 100%;
            margin: 0;
          }
        }
      </component>
      <section :data-theme="theme">
        <h1>Primary</h1>
        <fitx-button :theme="theme" modifier="primary">Primary</fitx-button>
        <fitx-button :theme="theme" modifier="primary" fake-modifier="hover">Primary (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" :modifier="['primary', 'disabled']">Primary disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Primary small</h1>
        <fitx-button :theme="theme" size="small">Primary small</fitx-button>
        <fitx-button :theme="theme" size="small" fake-modifier="hover">Primary small (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" size="small" disabled>Primary small disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Secondary</h1>
        <fitx-button :theme="theme" modifier="secondary">Secondary</fitx-button>
        <fitx-button :theme="theme" modifier="secondary" fake-modifier="hover">Secondary (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" :modifier="['secondary', 'disabled']">Secondary disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Secondary small</h1>
        <fitx-button :theme="theme" modifier="secondary" size="small">Secondary small</fitx-button>
        <fitx-button :theme="theme" modifier="secondary" size="small" fake-modifier="hover">Secondary small (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" :modifier="['secondary', 'disabled']" size="small">Secondary small disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Tertiary</h1>
        <fitx-button :theme="theme" modifier="tertiary">Tertiary</fitx-button>
        <fitx-button :theme="theme" modifier="tertiary" fake-modifier="hover">Tertiary (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" :modifier="['tertiary', 'disabled']">Tertiary disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Tertiary small</h1>
        <fitx-button :theme="theme" modifier="tertiary" size="small">Tertiary small</fitx-button>
        <fitx-button :theme="theme" modifier="tertiary" size="small" fake-modifier="hover">Tertiary small (hover|focus|active)</fitx-button>
        <fitx-button :theme="theme" :modifier="['tertiary', 'disabled']" size="small">Tertiary small disabled</fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Quaternary</h1>
        <p>Für die Verwendung auf Bildern</p>
        <div
          class="demo"
          style="padding: 2rem; background: url(https://images.ctfassets.net/5nz27qohji6m/3SltSCoCc705Ft514zJzyw/a95f62dc0663acda5d24dabb3c76de7e/fitnessstudios_in_berlin.webp) 50% no-repeat; background-size: cover;">
          <fitx-button :theme="theme" modifier="quaternary">Quaternary</fitx-button>
          <fitx-button :theme="theme" modifier="quaternary" fake-modifier="hover">Quaternary (hover|focus|active)</fitx-button>
          <fitx-button :theme="theme" :modifier="['quaternary', 'disabled']">Quaternary disabled</fitx-button>
        </div>
      </section>

      <section :data-theme="theme">
        <h1>Quaternary small</h1>
        <p>Für die Verwendung auf Bildern</p>
        <div
          class="demo"
          style="padding: 2rem; background: url(https://images.ctfassets.net/5nz27qohji6m/3SltSCoCc705Ft514zJzyw/a95f62dc0663acda5d24dabb3c76de7e/fitnessstudios_in_berlin.webp) 50% no-repeat; background-size: cover;">
          <fitx-button :theme="theme" modifier="quaternary" size="small">Quaternary small</fitx-button>
          <fitx-button :theme="theme" modifier="quaternary" fake-modifier="hover" size="small">Quaternary small (hover|focus|active)</fitx-button>
          <fitx-button :theme="theme" :modifier="['quaternary', 'disabled']" size="small">Quaternary small disabled</fitx-button>
        </div>

      </section>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    // size: 'default',
  },
  parameters: {
    docs: {
      // story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      // source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
    controls: {
      disable: true,
    },
  },
  // @ts-ignore-next-line
  render: (args) => ({
    components: {
      FitxButton,
      IconClose,
    },
    setup() {
      return {
        theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        section, .demo {
          --demo-text-color: inherit;
          &:is([data-theme=dark]) {
            --demo-text-color: white;
          }

          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-block-end: 3rem;
          & p { margin: 0 }
          & h1 {
            flex: 1 0 100%;
            margin: 0;
            color: var(--demo-text-color);
          }
        }
      </component>
      <section :data-theme="theme">
        <h1>Icons Start</h1>
        <fitx-button :theme="theme">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="secondary">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="tertiary">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="quaternary">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Icons Start small</h1>
        <fitx-button :theme="theme" size="small">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="secondary" size="small">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="tertiary" size="small">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
        <fitx-button :theme="theme" modifier="quaternary" size="small">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Icons End</h1>
        <fitx-button :theme="theme">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="secondary">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="tertiary">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="quaternary">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
      </section>

      <section :data-theme="theme">
        <h1>Icons End small</h1>
        <fitx-button :theme="theme" size="small">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="secondary" size="small">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="tertiary" size="small">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
        <fitx-button :theme="theme" modifier="quaternary" size="small">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-button>
      </section>
    `,
  }),
};
