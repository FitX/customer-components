import { type Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import { computed } from 'vue';
import { themeDecorator } from './theme-decorator';
import { ThemedContainer } from './docs-theme-provider';

import './sb-theme-overwrites.css';
import '@/assets/styles/fitx-brand.css';

export const decorators = [
  themeDecorator,
  (story, context) => {
    return {
      setup() {
        return {
          story,
          theme: computed(() => context.viewMode === 'story' ? context.globals.theme : undefined),
        }
      },
      template: '<div :data-theme-story="theme"><story /></div>',
    };
  },
];

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
      container: ThemedContainer,
      inline: false,
    },
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        order: ['Welcome', ['Docs', 'Install and Use', 'Colors', 'Icons'], 'Components', 'Composables', '*', 'Tests'],
      },
    },
  },
  decorators,
};

export default preview;
