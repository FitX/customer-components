# customer-components

FitX Vue 3 Components and Widget Library. [Overview](https://customer-components.netlify.app)

![npm (scoped)](https://img.shields.io/npm/v/@fitx/customer-components?style=flat-square)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@fitx/customer-components)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@fitx/customer-components)
![Release CI](https://github.com/FitX/customer-components/actions/workflows/workflow.yml/badge.svg)

## Use Package 🐨
### Requirements
- [![Node Version](https://img.shields.io/badge/Node-lts%20_v.20_-blue)](.nvmrc)
- [![Vue ^3.2.11](https://img.shields.io/badge/Vue-^3.4-blue)](.package.json)

### Install Fitx Customer Components

```shell
$ npm install @fitx/customer-components --save
```

### Using Components

```vue
<script lang="ts" setup>
  import { FitxButton } from '@fitx/customer-components';
</script>
<template>
  <fitx-button>Nice</fitx-button>
</template>
```

### Import Styles
Normally via main.ts

```js
import '@fitx/customer-components/styles.css';
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Type-Check, Compile and Minify for Package Release

```sh
npm run build:lib
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Start Storybook local
```
npm run storybook
```

### Build Storybook
```
npm run build-storybook
```

## Development
For Local Component Testing see [Sandbox](./sandbox/) Implementation.


## Update Lib
Make sure to update [component index file](src/components/index.ts) after add new Components. and run
```
npm run build:lib
```
## Publish Lib
```
npm publish --access public
```

## Release to NPM and publish to netlify
As soon as you merge or push into branch 'release' GitHub Actions starts a workflow:
- run unit tests
- after success:
- publish to NPM
- netlify will trigger build for manually deployment

- On update Master, Netlify will build and deploy automatically

❗ If version in package.json is not updated, NPM release will fail ❗
