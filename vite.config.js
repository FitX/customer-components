import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue({
      /**
       * Get inlined Styles in esm modules
       * @link https://github.com/vitejs/vite/blob/main/packages/plugin-vue/README.md#using-vue-sfcs-as-custom-elements
       */
      // customElement: true,
    }), // for vue plugin
    svgLoader(),
  ],
  resolve: {
    // extensions: ['.js', '.ts', '.vue', '.json'],
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '~@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    cssCodeSplit: true,
    target: 'esnext', // esnext | es2015
    // minify: 'esbuild',
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['cjs', 'es', 'umd', 'iife'], // 'es' | 'cjs' | 'umd' | 'iife'
      name: 'customerComponents',
    },
    /* rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    }, */
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        //esModule: true,
        assetFileNames: 'customer-components.[ext]',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
