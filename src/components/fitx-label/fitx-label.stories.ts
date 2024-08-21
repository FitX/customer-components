import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxLabel } from './fitx-label.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation'

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Label',
  component: FitxLabel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        //story: ComponentDescription,
        component: ComponentDescription,
      },
    },
  }
} satisfies Meta<typeof FitxLabel>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Firstname',
  },
};

export const Error: Story = {
  args: {
    text: 'Firstname',
    error: true,
  },
};

export const DisabledByProp: Story = {
  args: {
    text: 'Firstname',
    state: 'disabled',
  },
  parameters: {
    docs: {
      description: {
        story: `
Disabled über den State entfernt zusätzlich die Focusierbarkeit.
Im Normalfall bitte über Disabled-Attribut Lösen um Zugänglichkeit zu gewähren.`
      }
    }
  },
};
