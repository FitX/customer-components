import type { StorybookConfig } from '@storybook/vue3-vite';
import { storybookFitxThemeDark, storybookFitxThemeLight } from '../utils/create-custom-theme';

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    { from: '../coverage', to: '/coverage'},
    '../docs',
    { from: '../src/assets', to: '/lib-assets'}
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    },
  },
  env: (config) => ({
    ...config,
    /**
     * Because no other solution to add css extension to manager.ts/theme.ts
     * @link https://github.com/storybookjs/storybook/blob/8e51bf9b2452c501c18bafb824b4f48a57e824b3/code/core/src/builder-manager/index.ts#L52
     */
    CUSTOM_THEME_DARK: storybookFitxThemeDark,
    CUSTOM_THEME_LIGHT: storybookFitxThemeLight,
  }),
};
export default config;
