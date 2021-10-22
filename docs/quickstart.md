# Quick start

How to use Customer Components in projects.

## Using components

### Import on demand

Lib provides out of box [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
functionalities based on ES Module.

> App.vue

```html
<template>
  <base-button>Jo</base-button>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BaseButton } from '@fitx/customer-components';

  export default defineComponent({
    name: 'app'
    components: {
      BaseButton,
    },
  })
</script>
```

### Full import via app.use()

```js
import { createApp } from 'vue';
import App from './App.vue';
import customerComponents from '../dist/customer-components.es';

const app = createApp(App);
app.use(customerComponents);
app.mount('#app');
```

### Import stylesheets

It is **strongly recommended** that you import the **bundled stylesheet file**, even
though this could increase the final output bundle size, but it requires no
packaging plugins for bundling, you can use
[CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) to load your stylesheet
which would be much faster than hosting the file on your own server.

Import via JavaScript

```js
import '@fitx/customer-components/dist/customer-components.css'
```

Import via HTML `head` tag.

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="//unpkg.com/@fitx/customer-components/dist/customer-components.css" />
</head>
```

If you also want the style to be imported on demand, u can use the umd export of this library.

