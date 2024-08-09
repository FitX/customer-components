import fs from 'fs-extra';
import { join } from 'node:path';
import { getCustomPropertyValue } from './custom-property';

const ColorsPath = join(__dirname, '../src/assets/styles/colors.css');
const ColorsRaw = fs.readFileSync(ColorsPath, 'utf-8');

const storybookFitxShared = {
  // Typography
  fontBase: '"Niveau Grotesk"',
  fontCode: 'monospace',

  brandTitle: 'FitX Components',
  brandUrl: 'https://components-dev.fitx.de',
  brandTarget: '_self',

  colorPrimary: getCustomPropertyValue(ColorsRaw, '--brand-color-orange-0'), //   --brand-color-orange-0: #ed6a12;
  colorSecondary: getCustomPropertyValue(ColorsRaw, '--brand-color-blue'),

  appBorderRadius: 4,
  inputBorderRadius: 2,
};

export const storybookFitxThemeDark = {
  base: "dark",
  ...storybookFitxShared,

  appBg: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-1'),
  appContentBg: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  appPreviewBg: "#FFFFFF",
  appBorderColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-coal'),

  textColor: getCustomPropertyValue(ColorsRaw, '--brand-color-white-0'),
  textInverseColor: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-2'),
  textMutedColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-graphite'),
  barTextColor: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-cement'),
  barHoverColor: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-orange'),
  barSelectedColor: getCustomPropertyValue(ColorsRaw, '--brand-color-orange-1'),
  barBg: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-3'),
  buttonBg: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-2'),
  buttonBorder: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-coal'),
  booleanBg: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-2'),
  booleanSelectedBg: getCustomPropertyValue(ColorsRaw, '--brand-color-anthracite-3'),
  inputBg: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),
  inputBorder: getCustomPropertyValue(ColorsRaw, '--brand-color-gray-coal'),
  inputTextColor: getCustomPropertyValue(ColorsRaw, '--brand-color-white-0'),
};

export const storybookFitxThemeLight = {
  base: 'light',
  ...storybookFitxShared,

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: getCustomPropertyValue(ColorsRaw, '--primary-brand-color-anthracite'),

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
};

