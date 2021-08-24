import { addDecorator } from '@storybook/vue3';
import { withThemes } from 'storybook-addon-themes/vue';
import '!style-loader!css-loader!sass-loader!../src/assets/styles/lib.scss';
import '!style-loader!css-loader!sass-loader!./base.scss';

addDecorator(withThemes);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  /* backgrounds: {
    default: 'fitx light',
    values: [
      {
        name: 'fitx light',
        foo: 'light',
        value: '#fff',
      },
      {
        name: 'fitx dark',
        foo: 'dark',
        value: '#181D1E',
      },
    ],
  }, */
  themes: {
    clearable: false,
    default: 'fitx-light',
    list: [
      { name: 'fitx-light', class: 'fitx-light-theme', color: '#fff' },
      { name: 'fitx-dark', class: 'fitx-dark-theme', color: '#181D1E' }
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
