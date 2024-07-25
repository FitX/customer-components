import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import { FitxTextButton, textButtonStates } from './index';
import { IconClose } from '@/components/icons/index';
import { computed, onMounted, ref, watch } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/TextButton',
  component: FitxTextButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    modifier: { control: 'multi-select', options: [...textButtonStates] },
    // size: { control: 'select', options: ['small', 'default'] },
  },
  args: {
    default: 'FitX Text Button',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof FitxTextButton>;

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
    docs: {
      description: {
        story: `** Verwendung **

- Momentan gibt es keine Hinweise auf die Verwendung
- @TODO Wo und warum wird diese Komponente verwendet.
- @TODO Wo liegt der Unterschied zu Text Links.
- Hinweis: Secondary Font Weight ist kein Fehler, die ist beim Secondary schmaler.

          `,
      },
    },
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
      FitxTextButton,
    },
    setup() {
      const _theme = ref();
      onMounted(() => {
        _theme.value = document.documentElement.dataset['theme'];
      });

      watch(() => args.theme, (val) => {
        _theme.value = val;
      })
      return {
        theme: _theme,
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
        <fitx-text-button :theme="theme" modifier="primary">Primary</fitx-text-button>
        <fitx-text-button :theme="theme" modifier="primary" fake-modifier="hover">Primary (hover|focus|active)</fitx-text-button>
        <fitx-text-button :theme="theme" :modifier="['primary', 'disabled']">Primary disabled</fitx-text-button>
      </section>

      <section :data-theme="theme">
        <h1>Secondary</h1>
        <fitx-text-button :theme="theme" modifier="secondary">Secondary</fitx-text-button>
        <fitx-text-button :theme="theme" modifier="secondary" fake-modifier="hover">Secondary (hover|focus|active)</fitx-text-button>
        <fitx-text-button :theme="theme" :modifier="['secondary', 'disabled']">Secondary disabled</fitx-text-button>
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
      FitxTextButton,
      IconClose,
    },
    setup() {
      const _theme = ref();
      onMounted(() => {
        _theme.value = document.documentElement.dataset['theme'];
      });

      watch(() => args.theme, (val) => {
        _theme.value = val;
      })
      return {
        theme: _theme,
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
        <fitx-text-button :theme="theme">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-text-button>
        <fitx-text-button :theme="theme" modifier="secondary">
          <template #icon-start>
            <icon-close />
          </template>
          Icon Left
        </fitx-text-button>
      </section>

      <section :data-theme="theme">
        <h1>Icons End</h1>
        <fitx-text-button :theme="theme">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-text-button>
        <fitx-text-button :theme="theme" modifier="secondary">
          <template #icon-end>
            <icon-close />
          </template>
          Icon End
        </fitx-text-button>
      </section>
    `,
  }),
};
