import type { Meta, StoryObj } from '@storybook/vue3';
import { FitxButton } from '@/components';
import { default as FitxDialog } from './fitx-dialog.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Dialog',
  component: FitxDialog,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: {
        layout: 'fullscreen',
      },
      description: {
        //story: ComponentDescription,
        component: ComponentDescription,
      },
    },
  },
  decorators: [() => ({ template: '<div style="height: 50vh;"><story/></div>' })],
} satisfies Meta<typeof FitxDialog>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    modelValue: true,
    title: 'Optional Title',
    default: 'Lorem Ipsum Dolor Sit Amet',
  },
};

export const Example: Story = {
  args: {
    modelValue: false,
    title: 'Custom Content',
  },
  render: (args) => ({
    components: { FitxDialog, FitxButton },
    setup() {
      return { args };
    },
    template: `
      <fitx-dialog v-bind="args">
        <template #default>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl nec tincidunt lacinia, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl nec tincidunt lacinia, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.</p>
        </template>
        <template v-slot:footer>
          <fitx-button size="small">Ok</fitx-button>
        </template>
      </fitx-dialog>
    `,
  }),
};
