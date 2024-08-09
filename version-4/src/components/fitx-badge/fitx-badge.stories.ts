import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxBadge } from './fitx-badge.vue';
import { computed } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Badge',
  component: FitxBadge,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Usage: Story = {
  args: {
    text: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story: `**Es gibt keine Modifier mehr** Fortan müssen Badges per App gestyled werden.

- Breite passt sich dem Inhalt an
- können einzeln und zusammen verwendet werden
- werden nebeneinander und dann mehrzeilig angezeigt
- Farbe je nach Funktion frei wählbar

          `,
      },
    },
  },
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

            & small { font-weight: 400; font-size: 1rem; }
          }
        }

        /*
         * Example Styles for Apps
         * Colors, or round
        */
        .is-primary {
        --badge-color-background-light: var(--primary-brand-color-orange);
        --badge-color-text-light: var(--brand-color-white-0);
        --badge-color-background-dark: var(--primary-brand-color-orange);
        --badge-color-text-dark: var(--brand-color-white-0);
        }

        .is-success {
        --badge-color-background-light: var(--functional-color-success-0);
        --badge-color-text-light: var(--brand-color-white-0);
        --badge-color-background-dark: var(--functional-color-success-0);
        --badge-color-text-dark: var(--brand-color-white-0);
        }
        .is-error {
        --badge-color-background-light: var(--functional-color-error-0);
        --badge-color-text-light: var(--brand-color-white-0);
        --badge-color-background-dark: var(--functional-color-error-0);
        --badge-color-text-dark: var(--brand-color-white-0);
        }

        .is-any {
        --badge-color-background-light: var(--brand-color-anthracite-6);
        --badge-color-text-light: var(--brand-color-white-0);
        --badge-color-background-dark: var(--brand-color-anthracite-6);
        --badge-color-text-dark: var(--brand-color-white-0);
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
      <section :data-theme="theme">
        <h1>Beispiel Badges <br><small>Styles müssen in den Apps hinzugefügt werden da es keine Modifier mehr gibt ab Version 4.</small></h1>
        <fitx-badge
          v-for="example in examples"
          :theme="theme" :text="example.text" :class="example.class" />

        <h1>Beispiel Badges Zahlen <br><small>Styles müssen in den Apps hinzugefügt werden da es keine Modifier mehr gibt ab Version 4.</small></h1>
        <fitx-badge
          v-for="(example, index) in examples"
          :theme="theme" :text="index" :class="example.class" class="is-round" />
        <fitx-badge
          :theme="theme" :text="49" class="is-round" />
      </section>
    `,
  }),
};
