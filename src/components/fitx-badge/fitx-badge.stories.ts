
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxBadge } from './fitx-badge.vue';
import ContentDe from './readme.de.md?raw';
import IconClock from '@/assets/icons/clock.svg';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';
import { h } from 'vue';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Badge',
  component: FitxBadge,
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
} satisfies Meta<typeof FitxBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Badge',
  },
};

export const WithIcon: Story = {
  args: {
    icon: h(IconClock),
  },
  render: (args) => ({
    components: {
      FitxBadge,
      IconClock,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<fitx-badge text="Badge" :icon="args.icon"></fitx-badge>'
  }),
};

export const Examples: Story = {
  args: {
    text: 'default',
  },
  parameters: {
    docs: {},
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxBadge,
    },
    setup() {
      return {
        examples: [
          {
            text: 'Primary',
            class: 'is-primary',
          },
          {
            text: 'Success',
            class: 'is-success',
          },
          {
            text: 'Error',
            class: 'is-error',
          },
          {
            text: 'Dont know',
            class: 'is-any',
          },
        ],
      };
    },
    template: `
      <component is="style">
        section, .demo {
          --demo-text-color: inherit;
          [data-theme*="dark"] & {
            --demo-text-color: white;
          }

          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-block-end: 3rem;
          color: var(--demo-text-color);
          & hr {
            flex: 1 0 100%;
            margin: 0;
          }
        }

        /*
         * Example Styles for Apps
         * Colors, or round
        */
        .is-primary {
        --fitx-badge-color-background: var(--primary-brand-color-orange);
        --fitx-badge-color-text: var(--brand-color-white-0);
        }

        .is-success {
        --fitx-badge-color-background: var(--functional-color-success-0);
        --fitx-badge-color-text: var(--brand-color-white-0);
        }
        .is-error {
        --fitx-badge-color-background: var(--functional-color-error-0);
        --fitx-badge-color-text: var(--brand-color-white-0);
        }

        .is-any {
        --fitx-badge-color-background: var(--brand-color-anthracite-6);
        --fitx-badge-color-text: var(--brand-color-white-0);
        }

        .is-round {
        --badge-radius: calc(infinity * 1px);
        --badge-font-size: 1.25rem;
        --badge-padding-inline: 0;
        --badge-padding-block: 0;
        width: 2rem;
        aspect-ratio: 1;
        }
      </component>
      <section>
        <fitx-badge
          v-for="example in examples"
          :text="example.text" :class="example.class" />
        <hr>
        <fitx-badge
          v-for="(example, index) in examples"
          :text="index" :class="example.class" :is-round="true" />
        <fitx-badge
          :text="49" :is-round="true" />
      </section>
    `,
  }),
};
