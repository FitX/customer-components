import { create } from '@storybook/theming/create';
import FitxLogo from '../public/fitx-logo.png';

export const fitxLight = create({
  base: 'light',
  brandImage: FitxLogo,
  fontBase: '"Niveau Grotesk"',

  brandTitle: 'FitX Components',
  brandUrl: 'https://components-dev.fitx.de',
  brandTarget: '_self',

  colorPrimary: 'hotpink', // @TODO usage?
  colorSecondary: '#ed6a12', //     --brand-color-orange-0: #ed6a12;
});
