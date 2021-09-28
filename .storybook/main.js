const path = require('path');
// const customVueConfig = require('../vue.config.js');
// const customWebpackConfigVue = require('../node_modules/@vue/cli-service/webpack.config');

module.exports = {
  // Load Web Components as Configuration helper
  previewHead: (head) => (`
    ${head}
    <script
    src="https://jspm.dev/@spectrum-web-components/bundle/elements.js"
    type="module"
></script>
  `),
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
    /**
     * Ignore sp-* spectrum webcomponents from compile as vue component
     */
    const vueRule = config.module.rules.find(rule => rule.test.test('.vue'));
    vueRule.options = {
      ...vueRule.options,
      compilerOptions: {
        // treat any tag that starts with sp- as custom elements
        isCustomElement: (tag) => tag.startsWith('sp-'),
      },
    }
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
    // return { ...customVueConfig, ...config };
  },
}
