const PACKAGE_JSON = require('./package.json');

module.exports = {
  // css: { extract: false },
  /* configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  }, */
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      }],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith('color-slider'),
        },
      }));
    config.plugin('define')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0]['process.env'].VERSION = JSON.stringify(PACKAGE_JSON.version);
        return args;
      });
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
