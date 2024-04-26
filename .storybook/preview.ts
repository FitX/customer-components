import type { Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events';

const themeOptions = ['light', 'dark'] as const;

let ThemeGlobalEventListenerIsActive = false;
let ThemeStoryEventListenerIsActive = false;
const toggleDocumentStyles = (name: typeof themeOptions[number]) => {
  document.documentElement.setAttribute('data-theme', name);
};

const preview: Preview = {
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
  argTypes: {
    theme: {
      options: themeOptions,
      control: 'select'
    }
  },
  args: {
    theme: themeOptions[0]
  },
  decorators: [
    (story, context) => {
      const [args, updateArgs] = useArgs();

      const handleUpdates = (globalStore) => {
        console.log('handleUpdates', globalStore)
        const newThemeName = globalStore.globals.theme;
        toggleDocumentStyles(newThemeName);
        console.log({
          context: context,
          globalStore: globalStore,
          story: story,
          args: args,
        })
        if (context.args.theme !== newThemeName) {
          updateArgs({
            theme: newThemeName,
          });
        }
      };

      const handleUpdatesByStory = (event) => {
        const newThemeName = event.updatedArgs.theme;
        toggleDocumentStyles(newThemeName);
      };

      if (!ThemeGlobalEventListenerIsActive) {
        addons.getChannel().on(UPDATE_GLOBALS, handleUpdates);
        ThemeGlobalEventListenerIsActive = true;
        // initial set theme styles
        toggleDocumentStyles(context.globals.theme);
      }

      if (!ThemeStoryEventListenerIsActive) {
        addons.getChannel().on(UPDATE_STORY_ARGS, handleUpdatesByStory);
        ThemeStoryEventListenerIsActive = true;
      }

      return {
        setup(props, ctx) {
          return {
            story,
          }
        },
        template: '<story />',
      };
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    /* controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
    } */
  },
};

export default preview;
