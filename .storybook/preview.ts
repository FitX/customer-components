import { type Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from '@storybook/core-events';

const themeOptions = ['light', 'dark'];

let ThemeEventListenerIsActive = false;
const toggleDocumentStyles = (name) => {
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
  /* argTypes: {
    theme: {
      control: 'select',
      options: themeOptions,
      description: 'Kannste dein Theme überschreiben wenn du willst.',
    },
  }, */
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
      const [args, updateArgs] = useArgs();

      const handleUpdates = (globalStore) => {
        const newThemeName = globalStore.globals.theme;
        toggleDocumentStyles(newThemeName);
        if (context.args.theme !== newThemeName) {
          console.log('UPDATE START')
          updateArgs({
            theme: newThemeName,
          });
          console.log('UPDATE END')
        }
      };

      console.log('ThemeEventListenerIsActive', ThemeEventListenerIsActive)
      if (!ThemeEventListenerIsActive) {
        addons.getChannel().on(GLOBALS_UPDATED, handleUpdates);
        ThemeEventListenerIsActive = true;
      }
      return story();
    },
  ],
};

export default preview
