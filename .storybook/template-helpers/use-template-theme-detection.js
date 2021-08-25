import addons from '@storybook/addons';
import { computed, ref } from 'vue';
import { parameters } from '../preview';

const themeDetection = () => {
  const { themes } = parameters;
  /**
   * Via Addon
   * @link https://github.com/tonai/storybook-addon-themes/blob/296a5421ede18c801da561d2f9a32bcf1d3b7c99/src/constants.ts
   * @type {string}
   */
  const THEME_UPDATE_KEY = 'storybook-addon-themes/change';
  const defaultTheme = themes.default;
  const channel = addons.getChannel();
  const selectedTheme = ref(channel.last(THEME_UPDATE_KEY)?.[0] || defaultTheme);
  const isDarkMode = computed(() => selectedTheme.value === 'fitx-dark');
  const backgroundColor = computed(() => {
    const selectedThemeDetails = themes.list.find((item) => item.name === selectedTheme.value);
    return selectedThemeDetails?.color || defaultTheme.color;
  });
  channel.on(THEME_UPDATE_KEY, (name) => {
    selectedTheme.value = name;
  });
  return {
    isDarkMode,
  };
};
export default themeDetection;
