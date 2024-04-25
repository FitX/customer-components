import { type Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from '@storybook/core-events';

const themeOptions = ['light', 'dark'];

let ThemeEventListenerIsActive = false;

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
        console.log('??', addons.getChannel().eventNames());
        const newThemeName = globalStore.globals.theme;
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

      // console.log('UPDATE END END')
      // addons.getChannel().off(GLOBALS_UPDATED, handleUpdates);
      return {
        components: { story },
        setup() {
          const theme = context.args.theme || 'light';
          const backGround = `background: ${theme === 'dark' ? '#000' : '#fff'}`;
          console.log('huhu vue')
          return {
            backGround,
            theme,
          };
        },
        template: '<h1>Hallo {{ theme }}</h1><div :style="backGround"><story /></div>',
      };
    },
  ],
};

export default preview
