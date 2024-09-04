
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxButton } from './fitx-button.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

const demoStylesOverview = `section, .demo {
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
        }`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/Button',
  component: FitxButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        //story: ComponentDescription,
        component: ComponentDescription,
      },
    },
  },
} satisfies Meta<typeof FitxButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Klick mich',
  },
};

export const Slots: Story = {
  args: {
    default: 'blubb',
    'icon-start': '(:',
    'icon-end': '!!!'
  },
};

export const Primary: Story = {
  args: {
    // state: 'hover',
  },
  render: (args) => ({
    components: {
      FitxButton,
    },
    setup() {
      return {
        demoStylesOverview,
        // theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        {{ demoStylesOverview }}
      </component>
      <section>
        <h1>Primary</h1>
        <fitx-button modifier="primary">Primary</fitx-button>
        <fitx-button modifier="primary" state="hover">Primary (hover|focus|active)</fitx-button>
        <fitx-button modifier="primary" state="disabled">Primary disabled</fitx-button>
      </section>

      <section>
        <h1>Primary small</h1>
        <fitx-button size="small">Primary small</fitx-button>
        <fitx-button size="small" state="hover">Primary small (hover|focus|active)</fitx-button>
        <fitx-button size="small" disabled>Primary small disabled</fitx-button>
      </section>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    // state: 'hover',
  },
  render: (args) => ({
    components: {
      FitxButton,
    },
    setup() {
      return {
        demoStylesOverview,
        // theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        {{ demoStylesOverview }}
      </component>

      <section>
        <h1>Secondary</h1>
        <fitx-button modifier="secondary">Secondary</fitx-button>
        <fitx-button modifier="secondary" state="hover">Secondary (hover|focus|active)</fitx-button>
        <fitx-button modifier="secondary" state="disabled">Secondary disabled</fitx-button>
      </section>

      <section>
        <h1>Secondary small</h1>
        <fitx-button modifier="secondary" size="small">Secondary small</fitx-button>
        <fitx-button modifier="secondary" size="small" state="hover">Secondary small (hover|focus|active)</fitx-button>
        <fitx-button modifier="secondary" state="disabled" size="small">Secondary small disabled</fitx-button>
      </section>
    `,
  }),
};

export const Tertiary: Story = {
  args: {
    // state: 'hover',
  },
  render: (args) => ({
    components: {
      FitxButton,
    },
    setup() {
      return {
        demoStylesOverview,
        // theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        {{ demoStylesOverview }}
      </component>

      <section>
        <h1>Tertiary</h1>
        <fitx-button modifier="tertiary">Tertiary</fitx-button>
        <fitx-button modifier="tertiary" state="hover">Tertiary (hover|focus|active)</fitx-button>
        <fitx-button modifier="tertiary" disabled="disabled">Tertiary disabled</fitx-button>
      </section>

      <section>
        <h1>Tertiary small</h1>
        <fitx-button modifier="tertiary" size="small">Tertiary small</fitx-button>
        <fitx-button modifier="tertiary" size="small" state="hover">Tertiary small (hover|focus|active)</fitx-button>
        <fitx-button modifier="tertiary" state="disabled" size="small">Tertiary small disabled</fitx-button>
      </section>
    `,
  }),
};
