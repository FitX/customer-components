import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/lib.scss";',
      },
    },
  },
  build: {
    cssCodeSplit: false,
    target: 'es2015', // esnext | es2015
    lib: {
      entry: resolve(__dirname, 'src/components/index-wc.js'),
      formats: ['cjs', 'es', 'umd'], // 'es' | 'cjs' | 'umd' | 'iife'
      name: 'customer-components',
    },
    outDir: 'dist/wc/',
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: 'customer-components.[ext]',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
