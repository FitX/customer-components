import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../docs/**/*.mdx'],
  staticDirs: [
    { from: '../coverage', to: '/coverage'},
    '../docs',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@chromatic-com/storybook',
    // '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    }
  },
  docs: {
    // docsMode: true
  }
}
export default config
