module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/components/**/*.{js,vue}',
    '!./src/components/**/*.stories.js',
    '!./src/components/**/*.{e2e,spec}.js',
    './src/use/**/*.js',
  ],
};
