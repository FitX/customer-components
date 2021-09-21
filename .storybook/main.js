const path = require('path');
// const customVueConfig = require('../vue.config.js');
// const customWebpackConfigVue = require('../node_modules/@vue/cli-service/webpack.config');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx', // mdx doc files on top to render on top in nav
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // '../src/**/(BaseButton|ErrorIcon|ErrorMessage|TextButton|BaseInput).stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    'storybook-addon-themes',
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    /* config.externals = {
      '@vueuse/core': 'VueUse',
    }; */

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });

    config.resolve.alias = {
      '@': path.resolve(__dirname, "../src"),
      // we need runtime compiler (becuase console error)
      vue: 'vue/dist/vue.esm-bundler',
    }
    const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

    svgRule.test = /\.(png|jpe?g|gif|webp)$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'vue-loader-v16',
        'vue-svg-loader',
      ],
    });

    return config;
    // return { ...config, module: { ...config.module, rules: customWebpackConfigVue.module.rules } };
  },
}
