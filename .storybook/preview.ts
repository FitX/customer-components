import { type Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { UPDATE_GLOBALS } from '@storybook/core-events';

const themeOptions = ['light', 'dark'] as const;

let ThemeEventListenerIsActive = false;
const toggleDocumentStyles = (name: typeof themeOptions[number]) => {
  document.documentElement.setAttribute('data-theme', name);
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: themeOptions[0],
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: themeOptions,
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  args: {
    theme: themeOptions[0]
  },
  decorators: [
    (story, context) => {
      const [,, updateArgs] = useArgs();

      const handleUpdates = (globalStore) => {
        const newThemeName = globalStore.globals.theme;
        toggleDocumentStyles(newThemeName);
        if (context.args.theme !== newThemeName) {
          updateArgs({
            theme: newThemeName,
          });
        }
      };

      console.log('ThemeEventListenerIsActive', ThemeEventListenerIsActive)
      if (!ThemeEventListenerIsActive) {
        addons.getChannel().on(UPDATE_GLOBALS, handleUpdates);
        ThemeEventListenerIsActive = true;
      }
      return {
        setup(props, ctx) {
            return {
              theme: context.args.theme,
              story,
            }
        },
        template: `<h1 style="background: blue; padding: 1rem; color: white">{{ theme }}?</h1><story />`,
      };
    },
  ],
};

export default preview;
