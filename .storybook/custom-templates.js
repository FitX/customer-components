import addons from '@storybook/addons';
import { computed, ref } from 'vue';
import { parameters } from './preview';

/**
 * Template Wrapper to watch for theme-changes in storybook-addon-themes
 * @param args
 * @param {object} additionalSetup
 * @param template
 * @param components
 * @return {{template, components, setup(): {args: *, isDarkMode: ComputedRef<boolean> | WritableComputedRef<unknown>}}|{args, isDarkMode: ComputedRef<boolean>}}
 * @constructor
 */
export const TemplateWrapper = ({ args, additionalSetup = {}, template, components}) => {
  return {
    components,
    setup() {
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
      console.log('channel', channel);
      channel.on('updateGlobals', (blubb) => {
        console.log('update', blubb);
      });
      return {
        ...additionalSetup,
        args: {
          ...args,
          isDarkMode,
        },
        backgroundColor,
      };
    },
    template,
  };
};
