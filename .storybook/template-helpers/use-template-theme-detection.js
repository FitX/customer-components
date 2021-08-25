import addons from '@storybook/addons';
import { get } from '@vueuse/core'
import { computed, ref } from 'vue';
import { parameters } from '../preview';

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
channel.on(THEME_UPDATE_KEY, (name) => {
  selectedTheme.value = name;
});
export const isDarkMode = computed(() => selectedTheme.value === 'fitx-dark');
export default get(isDarkMode);
