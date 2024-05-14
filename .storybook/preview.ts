import type { Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events'
import '../src/assets/styles/lib.scss';
import { Theme } from '../src/types'

const themeOptions: Theme[] = ['light', 'dark'] as const;

let lastComponentId: string = null;
const toggleDocumentStyles = (name: typeof themeOptions[number]) => {
  document.documentElement.setAttribute('data-theme', name);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
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
      description: themeOptions.toString(),
      options: themeOptions,
      control: 'select',
      table: {
        type: { summary: themeOptions.map((theme) => `"${theme}"`).toString().replace(',',' | ') },
        defaultValue: themeOptions[0],
      },
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
        });
        toggleDocumentStyles(newThemeName);
      }

      // set theme by story args
      addons.getChannel().on(UPDATE_STORY_ARGS, (val) => {
        toggleDocumentStyles(val.updatedArgs.theme);
      });

      // overwrite args by global change
      addons.getChannel().on(UPDATE_GLOBALS, (val) => {
        // prevent multiple events
        if (context.abortSignal.aborted) return;

        const newThemeName = val.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
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
