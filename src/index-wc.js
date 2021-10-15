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

const objectMap = (obj, fn) => Object.fromEntries(
  Object.entries(obj).map(
    ([k, v], i) => [k, fn(v, k, i)],
  ),
);

export const webComponents = objectMap(components, (v) => defineCustomElement(v));

export function register() {
  Object
    .fromEntries(
      Object
        .entries(webComponents)
        .map(([k, v]) => [k, customElements.define(transformKebabCase(k), v)]),
    );
}

export default {
  ...webComponents,
};
