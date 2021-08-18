const path = require('path');
// const customVueConfig = require('../vue.config.js');
// const customWebpackConfigVue = require('../node_modules/@vue/cli-service/webpack.config');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx', // mdx doc files on top to render on top in nav
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.alias = {
      '@': path.resolve(__dirname, "../src"),
      // we need runtime compiler (becuase console error)
      vue: 'vue/dist/vue.esm-bundler',
    }
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    let rule = config.module.rules.find(r =>
      // it can be another rule with file loader
      // we should get only svg related
      r.test && r.test.toString().includes('svg') &&
      // file-loader might be resolved to js file path so "endsWith" is not reliable enough
      r.loader && r.loader.includes('file-loader')
    );
    rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['vue-svg-loader']
      }
    )

    return config;
    // return { ...config, module: { ...config.module, rules: customWebpackConfigVue.module.rules } };
  },
}
