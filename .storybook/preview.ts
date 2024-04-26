import type { Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { STORY_CHANGED, UPDATE_GLOBALS, UPDATE_STORY_ARGS } from '@storybook/core-events'
import '../src/assets/styles/lib.scss';

const themeOptions = ['light', 'dark'] as const;

let initial = true;
let lastComponentId = null;
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
      const [args, updateArgs] = useArgs();

      const newContextId = context.id;

      if (newContextId !== lastComponentId) {
        const newThemeName = context.globals.theme;

        toggleDocumentStyles(newThemeName, 'initial');
        updateArgs({
          theme: newThemeName,
        })
      }

      addons.getChannel().on(UPDATE_STORY_ARGS, (val) => {
        console.log('vali', val);
        toggleDocumentStyles(val.updatedArgs.theme, 'UPDATE_STORY_ARGS');
      });

      addons.getChannel().on(UPDATE_GLOBALS, (val) => {
        if (context.abortSignal.aborted) return;
        const newThemeName = val.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
        toggleDocumentStyles(newThemeName, 'UPDATE_GLOBALS');
      });

      addons.getChannel().on(STORY_CHANGED, () => {
        if (context.abortSignal.aborted) return;

        if (context.globals.theme === 'light') {
          console.log('oh nooooo light', context);
        }
        const newThemeName = context.globals.theme;
        updateArgs({
          theme: newThemeName,
        })
        toggleDocumentStyles(newThemeName, 'STORY_CHANGED');
      });

        // initial set theme styles
        // handleUpdates(context);
      // }

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
