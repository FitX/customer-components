# Install Fitx Customer Components

## Environment

| ![iOS](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) |
| ------------------------------- |
| @TODO version | latest |

This Library is currently in a rapid development iteration:

[![Library version badge](https://img.shields.io/npm/v/@fitx/customer-components.svg?style=flat-square)](https://www.npmjs.org/package/@fitx/customer-components)

## Install via npm

**We recommend using the package manager to install the Library**,
so that you can utilize bundlers like [vite](https://vitejs.dev) and
[webpack](https://webpack.js.org/).

```shell
$ npm install @fitx/customer-components --save
```

**Currently not @TODO web exports** Alternatively, u can use the Library directly in tn Browser
via cdn.jsdelivr.net/npm/@fitx/customer-components or //unpkg.com/@fitx/customer-components/
**Example:**

```html
<head>
  <!-- Introduce styles -->
  <link rel="stylesheet" href="//unpkg.com/@fitx/customer-components/dist/customer-components.css" />
  <!-- Introduce Vue -->
  <script src="//unpkg.com/vue@next"></script>
  <!-- Introduce component library -->
  <script src="//unpkg.com/@fitx/customer-components"></script>
</head>
```

## Hello Fitness Online Demos

### Library as Vue Plugin

<iframe src="https://codesandbox.io/embed/customer-components-use-as-plugin-qldlw?fontsize=14&hidenavigation=1&theme=light"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="customer-components-use-as-plugin"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit customer-components-use-as-plugin](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/customer-components-use-as-plugin-qldlw?fontsize=14&hidenavigation=1&theme=light)

### Library via Component Imports

<iframe src="https://codesandbox.io/embed/customer-components-use-via-imports-jzkqf?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=light"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="customer-components-use-via-imports"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit customer-components-use-via-imports](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/customer-components-use-via-imports-jzkqf?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FHelloWorld.vue&theme=light)

## What next?
If you are installing via npm / yarn and want to use it with
a packaging tool, please read the
next section: [Quick Start](./quickstart).
