import { create } from '@storybook/theming/create';
import FitxLogo from '../public/fitx-logo.png';

/**
 * Defined in main.ts
 */
export default create({
  // @ts-ignore
  ...process.env.CUSTOM_THEME_LIGHT,
  brandImage: FitxLogo,
});
