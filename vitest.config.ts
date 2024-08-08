import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**', 'version-4/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        include: [
          'src/components/**',
          'src/composables/**',
          'src/index.ts',
        ],
        exclude: [
          '**/*.stories.ts',
          '**/*.test.ts',
          '**/types.ts',
        ],
      },
    }
  })
)
