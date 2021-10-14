import '@/assets/styles/lib.scss';
import { defineCustomElement } from 'vue';
import * as components from './components/index';

/**
 * Convert camelCase to kebab-case
 * @param {string} string
 * @return {string}
 */
const transformKebabCase = (string) => string
  .split('')
  .map((letter, idx) => (letter
    .toUpperCase() === letter
    ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
    : letter)).join('');

// components collection
export const componentsCollection = { ...components };

// components desc array
export const webComponents = Object.keys(componentsCollection).map((item) => {
  const component = componentsCollection[item];
  /* return {
    name: component.name || 'c-comp', // kebab-case
    component: defineCustomElement(component),
  }; */
  return {
    [component.name]: defineCustomElement(component),
  };
});

/**
 * Global install Function
 * @param app - Vue instance
 */
export function register() {
  webComponents.forEach((item) => {
    const kebabCaseName = transformKebabCase(item.name);
    const registerComponent = item.component;
    window.customElements.define(kebabCaseName, registerComponent); // kebab-case
  });
}

/*
export default {
  ...componentsDesc.map((comp) => ({
    [comp.name]: comp.component,
  })),
};
*/

export default {
  ...webComponents,
};
