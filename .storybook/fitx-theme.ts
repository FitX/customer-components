import { create } from '@storybook/theming/create';
import FitxLogo from '../public/fitx-logo.png';

export default create({
  base: 'light',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'My custom Storybook',
  brandUrl: 'https://example.com',
  brandImage: FitxLogo,
  brandTarget: '_self',
});
