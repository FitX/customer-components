# customer-components

Vue 3 Brand-Evo Components and Widget Library for Customer Apps. [Overview](https://customer-components.netlify.app)


![Netlify](https://img.shields.io/netlify/72371083-7785-4449-bddc-842826333f40)
![npm (scoped)](https://img.shields.io/npm/v/@fitx/customer-components?style=flat-square)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@fitx/customer-components)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@fitx/customer-components)


## Use Package 🐨
### Install

```
npm i @fitx/customer-components
```
### Use in App
```
import { TextButton } from '@fitx/customer-components';
```

## Development 🤖

All Designs located as sketch files in [sketch cloud ✍](https://www.sketch.com/s/afae2a3c-0eaf-4735-9bd3-d0269c5c5bb3)

![Node Version](https://img.shields.io/badge/Node-lts%20_v.14_-blue)

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies Lib for production
```
npm run build:lib
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Start Storybook
```
npm run storybook
```

### Build Storybook
```
npm run build-storybook
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Local testing
### Link Lib to other Repo
Create local SymLink to Package

```
npm link
```

Go to consuming App, link and install

```
npm link customer-components
npm i customer-components
```

## Publish Lib
```
npm publish --access public
```
