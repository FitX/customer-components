import addons from '@storybook/addons';
import { computed, ref } from 'vue';
import { parameters } from '../preview';

/**
 * Get theme
 */
const { themes } = parameters;
/**
 * Via Addon
 * @link https://github.com/tonai/storybook-addon-themes/blob/296a5421ede18c801da561d2f9a32bcf1d3b7c99/src/constants.ts
 * @type {string}
 */
const THEME_UPDATE_KEY = 'storybook-addon-themes/change';
/**
 * Get default Theme
 * @type {string}
 */
const defaultTheme = themes.default;
const channel = addons.getChannel();
/**
 * Get selected Theme via last update entry or get default theme
 * @type {ToRef<*|string>}
 */
export const selectedTheme = ref(channel.last(THEME_UPDATE_KEY)?.[0] || defaultTheme);
/**
 * Listen to theme addon update
 */
channel.on(THEME_UPDATE_KEY, (name) => {
  selectedTheme.value = name;
});
/**
 * Get isDarkMode info
 * @type {ComputedRef<boolean>}
 */
export const isDarkMode = computed(() => selectedTheme.value === 'fitx-dark');
