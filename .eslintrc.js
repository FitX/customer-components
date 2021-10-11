module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['dist/*.js', '**/*.spec.{j,t}s?(x)', '**/*.stories.{j,t}s?(x)', 'vite.config.js', 'nightwatch.*', 'tests/**/*', 'src/index.js', '**/*'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/*.spec.{j,t}s?(x)',
        '**/*.stories.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
