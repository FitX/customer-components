import type { Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { STORY_CHANGED, UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events'
import '../src/assets/styles/lib.scss';

const themeOptions = ['light', 'dark'] as const;

let lastComponentId: string = null;
const toggleDocumentStyles = (name: typeof themeOptions[number], context) => {
  console.log('set data name', name, context);
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
      const [_, updateArgs] = useArgs();

      const newContextId = context.id;

      // overwrite args default
      if (newContextId !== lastComponentId) {
        const newThemeName = context.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
      }

      // set theme by story args
      addons.getChannel().on(UPDATE_STORY_ARGS, (val) => {
        toggleDocumentStyles(val.updatedArgs.theme, 'UPDATE_STORY_ARGS');
      });

      // overwrite args by global change
      addons.getChannel().on(UPDATE_GLOBALS, (val) => {
        // prevent multiple events
        if (context.abortSignal.aborted) return;

        const newThemeName = val.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
        toggleDocumentStyles(newThemeName, 'UPDATE_GLOBALS');
      });

      // overwrite args by globals on navigate
      addons.getChannel().on(STORY_CHANGED, () => {
        // prevent multiple events
        if (context.abortSignal.aborted) return;

        const newThemeName = context.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
        toggleDocumentStyles(newThemeName, 'STORY_CHANGED');
      });

      lastComponentId = newContextId;

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
