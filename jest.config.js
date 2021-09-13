module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: [
    '**/src/components/**/*.unit.spec.js',
    '**/test/**/*.unit.spec.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/components/**/*.{js,vue}',
    '!./src/components/HelloWorld.vue',
    '!./src/components/**/*.stories.js',
    '!./src/components/**/*.{e2e,spec}.js',
    './src/use/**/*.js',
  ],
};
