import type { Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events';
import '../src/assets/styles/lib.scss';

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
        title: 'Theme',
        icon: 'circlehollow',
        items: themeOptions,
        dynamicTitle: true,
      },
    },
  },
  argTypes: {
    theme: {
      options: themeOptions,
      control: 'select',
    },
  },
  args: {
    theme: themeOptions[0],
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (story, context) => {
      const [args, updateArgs] = useArgs();

      const handleUpdates = (globalStore) => {
        const newThemeName = globalStore.globals.theme;
        toggleDocumentStyles(newThemeName);
        // if (context.args.theme !== newThemeName) {
          updateArgs({
            theme: newThemeName,
          });
        // }
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
};

export default preview;
