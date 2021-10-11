module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: [
    '**/src/components/**/*.unit.spec.js',
    '**/src/use/**/*.unit.spec.js',
    '**/test/**/*.unit.spec.js',
    '!**/storybook-static/**/*',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/components/**/*.{js,vue}',
    './src/use/**/*.js',
    '!./src/components/HelloWorld.vue',
    '!./src/components/index.js',
    '!./src/components/**/*.stories.js',
    '!./src/components/**/*.{e2e,spec}.js',
  ],
};
