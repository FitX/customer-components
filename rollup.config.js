/** import esbuild from 'rollup-plugin-esbuild';
import vue from 'rollup-plugin-vue';
// import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import path from "path";
import alias from "@rollup/plugin-alias";
// import dartSass from 'sass';
import { terser } from 'rollup-plugin-terser'; */
import path from 'path';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: [{
    globals: {
      vue: 'Vue',
    },
    name: 'customer-components',
    file: 'dist/customer-components.js',
    format: 'umd',
    // plugins: [terser()],
  }, {
    name: 'customer-components',
    file: 'dist/customer-components.es.js',
    format: 'es',
    // plugins: [terser()],
  }],
  plugins: [
    alias({
      entries: {
        '@': path.resolve(__dirname, 'src'),
        // '~@': path.resolve(__dirname, 'src'),
      },
    }),
    // scss({ include: /\.scss$/, sass: dartSass }),
    vue({
      target: 'browser',
      preprocessStyles: true,
      defaultLang: {
        style: 'scss',
      },
      css: false,
    }),
    postcss(),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'esnext',
    }),
  ],
};
