import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxTextarea } from './fitx-textarea.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Textarea',
  component: FitxTextarea,
  argTypes: {
    disabled: {
      modifier: 'check',
    },
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Textarea',
  },
};

export const WithError: Story = {
  args: {
    label: 'Textarea with Error',
    errorMessage: 'This Field has a Error',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Textarea Disabled',
    disabled: true,
  },
};

export const PreFilled: Story = {
  args: {
    label: 'Textarea Prefilled',
    modelValue:
      'Web Content Accessibility Guidelines (WCAG) 2.1 covers a wide range of recommendations for making Web content more accessible. Following these guidelines will make content more accessible to a wider range of people with disabilities, including accommodations for blindness and low vision, deafness and hearing loss, limited movement, speech disabilities, photosensitivity, and combinations of these, and some accommodation for learning disabilities and cognitive limitations; but will not address every user need for people with these disabilities. These guidelines address accessibility of web content on desktops, laptops, tablets, and mobile devices. Following these guidelines will also often make Web content more usable to users in general.\n' +
      '\n' +
      'WCAG 2.1 success criteria are written as testable statements that are not technology-specific. Guidance about satisfying the success criteria in specific technologies, as well as general information about interpreting the success criteria, is provided in separate documents. See Web Content Accessibility Guidelines (WCAG) Overview for an introduction and links to WCAG technical and educational material.\n' +
      '\n' +
      'WCAG 2.1 extends Web Content Accessibility Guidelines 2.0 [WCAG20], which was published as a W3C Recommendation December 2008. Content that conforms to WCAG 2.1 also conforms to WCAG 2.0. The WG intends that for policies requiring conformance to WCAG 2.0, WCAG 2.1 can provide an alternate means of conformance. The publication of WCAG 2.1 does not deprecate or supersede WCAG 2.0. While WCAG 2.0 remains a W3C Recommendation, the W3C advises the use of WCAG 2.1 to maximize future applicability of accessibility efforts. The W3C also encourages use of the most current version of WCAG when developing or updating Web accessibility policies. @link: https://www.w3.org/TR/WCAG21/#abstract',
  },
};

export const DisabledModifierFilled: Story = {
  args: {
    label: 'Textarea Disabled',
    modelValue: 'Lorem Ipsum',
    modifier: 'disabled',
  },
};

export const MaxLength: Story = {
  args: {
    label: 'Textarea Count',
    modelValue: '',
    maxLength: 10,
  },
};

export const FieldSizingFixed: Story = {
  args: {
    label: 'Fixed with and 5 rows',
    modelValue: 'Lorem Ipsum Dolor',
    rows: 5,
    fieldSizing: false,
  },
};
