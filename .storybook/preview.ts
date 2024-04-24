import { type Preview } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api'

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
      if (args.theme !== context.globals.theme) {
        updateArgs({
          // ...args,
          theme: context.globals.theme || 'light',
        });
      }
      console.log('args', args);
      return {
        components: { story },
        setup() {
          const theme = context.globals.theme || 'light';
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

          console.log('context', context);
          // context.args.theme = theme;
          return {
            backGround,
          };
        },
        template: '<div :style="backGround"><story /></div>',
      };
    },
  ],
};

export default preview
