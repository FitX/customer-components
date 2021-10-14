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

const componentsDesc = Object.keys(componentsCollection).map((item) => {
  const component = componentsCollection[item];
  const name = component.name || 'c-comp';
  return {
    [name]: defineCustomElement(component),
  };
});

/**
 * Install Component as Web Component
 * @param {string} tagName - web component name in kebab-case
 * @param component - Vue Component
 */
const installWebComponent = function (tagName, component) {
  if (!tagName || !component) {
    return;
  }
  const validName = transformKebabCase(tagName);
  window.customElements.define(validName, component);
};

/**
 * Register all Components as Web Component, prefix with 'web-'
 */
export const installWebComponents = function () {
  componentsDesc.forEach((item) => {
    installWebComponent(`web-${item.name}`, item.component);
  });
};

// components desc array
export const webComponents = [...Object.entries(componentsCollection)].map(([key, value]) => ({
  [key]: defineCustomElement(value),
}));

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
