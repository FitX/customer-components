import { type Preview } from '@storybook/vue3';
import { useUrlSearchParams } from '@vueuse/core';
import { computed, watch } from 'vue'

const urlParameterGlobalTheme = /^backgrounds.value:!hex/
const selectedThemeColor = new URL(location.href).searchParams
  .get('globals')
  ?.split(";")
  .filter((item) => item.match(urlParameterGlobalTheme))?.[0]
  .replace('backgrounds.value:!hex','')
  .replace('(', '')
  .replace(')', '');

const themeOptions = [
  { name: 'light', value: '#fff' },
  { name: 'dark', value: '#181D1E' },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        theme: /theme/,
        date: /Date$/i
      }
    },
    backgrounds: {
      clearable: false,
      values: themeOptions,
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: themeOptions.map((option) => (option.name)),
      description: 'Kannste dein Theme überschreiben wenn du willst.'
    },
  },
  args: {
    // theme: themeOptions.find((option) => option.value.endsWith(selectedThemeColor))?.name,
    // theme: 'dark',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['light', 'dark'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const urlParam = useUrlSearchParams('history');
        const theme = computed(() => {
          const hexLike = urlParam.globals?.toString()
            .replace('backgrounds.value:!hex','')
            .replace('(', '')
            .replace(')', '');
          const val = themeOptions.find((option) => option.value.endsWith(hexLike))?.name;
          console.log('context.args.theme', context.args.theme);
          console.log('val', val);
          context.args.theme = val;
          console.log('context', context)
          return val;
        });
        const theme2 = context.globals.theme || 'light';
        context.args.theme = theme2;
        return {
          theme,
          theme2,
        }
      },
      template: '<div><h1>Deine mudda </h1><story /></div><pre>{{ theme }}</pre><h1 style="color: red;">{{ theme2 }}</h1>',
    }),
  ],
};

export default preview
