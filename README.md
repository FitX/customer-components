# customer-components

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
