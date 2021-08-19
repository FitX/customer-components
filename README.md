# customer-components
Vue Brand-Evo Components and Widget Library for Customer Apps. [Overview](https://customer-components.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/72371083-7785-4449-bddc-842826333f40/deploy-status)](https://app.netlify.com/sites/customer-components/deploys)

## Project setup
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
Go to consuming Package, link and install
```
npm link customer-components
npm i customer-components
```
## Publish Lib
```
npm publish --access public
```
