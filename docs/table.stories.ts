
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as TableDemo } from './demo/table-demo.vue';
import { default as TableDemoCode } from './demo/table-demo.vue?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Table',
  component: TableDemo,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['!dev', '!autodocs'],
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: {
        disable: true, // 👈 Disables the table of contents
      },
      description: {
        component: `
## Table Styles

FitX Components does not provide a dedicated table component.
Instead, the demo below demonstrates the FitX Table Styles and the usage of the composables.
The required styles for the table are located in the assets/styles/table.css directory.

The following composables are used for the following demo:
- [useSort](/docs/composables-use-sort--docs)
- [usePagination](/docs/composables-use-pagination--docs)
- [useFilter](/docs/composables-use-filter--docs)

These composabls and component-less table styles allow a flexible and modular implementation
of table layouts that can be easily adapted to the specific requirements of our apps.
        `,
      },
      source: {
        type: 'code',
        code: TableDemoCode,
      },
    },
  },
} satisfies Meta<typeof TableDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Example: Story = {
  args: {
    // text: 'This is an error message',
  },
};

/* export const TextFields: Story = {
  args: {
    // text: 'This is an error message',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: TableDemoCode,
      },
    },
  },
};*/

