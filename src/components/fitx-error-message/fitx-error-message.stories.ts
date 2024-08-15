import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxErrorMessage } from './fitx-error-message.vue';

const ComponentDescription = `
#### Beschreibung:
Sofern Eingabefelder nicht oder nicht nach den Vorgaben ausgefüllt werden, wird dem Nutzenden per Error Message ein entsprechender Hinweis ausgegeben.

#### Verwendung:
Für jedes Eingabefeld werden Fehlermeldungen definiert, die bei fehlender oder falscher Ausfüllung dem Nutzenden angezeigt werden.

#### Verhalten:
Die Error Message wird dem Nutzenden angezeigt, wenn
- ein Formular abgeschickt wird und Pflichtfelder nicht ausgefüllt sind.
- ein Eingabefeld verlassen wird und die Eingabe nicht den Vorgaben entspricht.

Fehlermeldungen: Inhaltlich versuchen eine Lösung aufzuzeigen.
Also statt "Name ist ein Pflichtfeld" vs "Bitte gib deinen Namen ein"
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Error Message',
  component: FitxErrorMessage,
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
} satisfies Meta<typeof FitxErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Please enter your name.',
  },
};
