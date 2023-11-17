import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import logo from './logo.png';

addons.setConfig({
enableShortcuts: false,
  theme: create({
    base: 'light',
    // colorPrimary: 'hotpink',
    //   colorSecondary: 'deepskyblue',
    //   // UI
    // appBg: 'red',
    // appContentBg: 'blue',
    //   appBorderColor: 'grey',
    //   appBorderRadius: 4,
    //   // Typography
    //   fontBase: '"Open Sans", sans-serif',
    //   fontCode: 'monospace',
    //   // Text colors
    //   textColor: 'black',
    //   textInverseColor: 'rgba(255,255,255,0.9)',
    //   // Toolbar default and active colors
    //   barTextColor: 'silver',
    //   barSelectedColor: 'black',
    //   barBg: 'hotpink',
    //   // Form colors
    //   inputBg: 'white',
    //   inputBorder: 'silver',
    //   inputTextColor: 'black',
    //   inputBorderRadius: 4,
    brandTitle: 'Brand Evo Styleguide',
    brandUrl: 'https://customer-components.netlify.app',
    // brandImage: 'https://www.fitx.de/img/block/shared/header/fitx_logo.svg',
    brandImage: logo, // @TODO read about some magic in webpack :P
    // brandImage: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 41 36\' style=\'width: var(--logo-width, 20px); height: var(--logo-height, 17px)\'%3E%3Cpath d=\'M29.977 18.305L40.968 6.567C37.472 3.819 32.731 1.765 27.355.805l-6.887 7.362L13.582.805C8.205 1.765 3.465 3.792-.032 6.567L10.96 18.305-.032 30.042c3.497 2.748 8.237 4.802 13.614 5.763l6.886-7.363 6.887 7.363c5.376-.96 10.117-2.988 13.613-5.763L29.977 18.305z\' fill=\'%23ED6A12\' fill-rule=\'evenodd\'/%3E%3C/svg%3E',
  }),
});
