import { type Preview } from '@storybook/vue3';
import { useArgs, addons } from '@storybook/preview-api';
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from '@storybook/core-events';

const themeOptions = ['light', 'dark'];

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
      /* console.log({
        context: context.args.theme,
        globals: context.globals.theme,
        foo: context,
      }); */
      console.log('??', addons.getChannel().eventNames());
      addons.getChannel().on(GLOBALS_UPDATED || UPDATE_GLOBALS || GLOBALS_UPDATED, (globalStore) => {
        console.log('GLOBALS_UPDATED', globalStore);
        const newThemeName = globalStore.globals.theme;
        if (context.args.theme !== newThemeName) {
          updateArgs({
            // ...args,
            theme: newThemeName,
          });
        }
      });
      /* addons.getChannel().on(UPDATE_GLOBALS, (globals) => {
        console.log('UPDATE_GLOBALS', globals);
      }) */
      /* if (context.args.theme !== context.globals.theme) {
        const newThemeName = context.globals.theme;
        updateArgs({
          // ...args,
          theme: newThemeName,
        });
      } */
      return {
        components: { story },
        setup() {
          // const theme = context.globals.theme || 'light';
          const theme = context.args.theme || 'light';
          // macht was
          // context.args.theme = theme;
          const backGround = `background: ${theme === 'dark' ? '#000' : '#fff'}`;
          /* context.args = {
            ...context.args,
            theme: theme,
          };
           */
          // context.hooks.hasUpdates = true;
          // context.argTypes.theme.defaultValue = theme;
          // context.initialArgs.theme = theme;
          // context.allArgs.theme = theme;
          /* const foo = async () => {
            context.args.theme = theme;
            const l = await context.applyLoaders(context);
            console.log('l', l)
          };
          foo(); */
          // context.initialArgs.theme = theme;
          // context.initialArgs.msg = theme;

          // console.log('context', context);
          // context.args.theme = theme;
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
