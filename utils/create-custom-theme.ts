import fs from 'fs-extra';
import { join } from 'node:path';
import { getCustomPropertyValue } from './custom-property';
// import FitxLogo from '../public/fitx-logo.png';

const ColorsPath = join(__dirname, '../src/assets/styles/colors.css');
const ColorsRaw = fs.readFileSync(ColorsPath, 'utf-8');

export const createTheme = () => ({
  base: 'light',
  // Typography
  fontBase: '"Niveau Grotesk"',
  fontCode: 'monospace',

  brandTitle: 'FitX Components',
  brandUrl: 'https://components-dev.fitx.de',
  // brandImage: FitxLogo,
  brandTarget: '_self',

  //
  colorPrimary: getCustomPropertyValue(ColorsRaw, '--brand-color-orange-0'), //   --brand-color-orange-0: #ed6a12;
  colorSecondary: getCustomPropertyValue(ColorsRaw, '--brand-color-blue'),

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  appBorderRadius: 4,

  // Text colors
  textColor: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-carbon'),
  barSelectedColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-graphite'),
  barHoverColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-graphite'),
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  inputTextColor: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  inputBorderRadius: 2,
});
