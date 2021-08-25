import { reactive, toRefs } from 'vue';
import isDarkMode from './use-template-theme-detection';
/**
 * Template Wrapper to watch for theme-changes in storybook-addon-themes
 * @param {object} args Components Args e.g { tag: 'button', text: 'Button' }
 * @param {object} additionalSetup Data for vue setup() method
 * @param {string} template e.g '<base-button text=bar />' or '<base-button v-bind="args" />'
 * @param {object} components e.g { components: { BaseButton }}
 * @return {{template, components, setup(): {args: *, isDarkMode: ComputedRef<boolean> | WritableComputedRef<unknown>}}|{args, isDarkMode: ComputedRef<boolean>}}
 * @constructor
 */
export const TemplateWrapper = ({ args, additionalSetup = {}, template, components}) => {
  return {
    components,
    setup() {
      const data = reactive({
        ...additionalSetup,
        args: {
          ...args,
          isDarkMode,
        }
      })
      return {
        ...toRefs(data),
      };
    },
    template,
  };
};
