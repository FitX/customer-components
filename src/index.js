// import { App } from 'vue';
// import * as components from './components/index';
/*
function install(Vue = App) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const component in components) {
    Vue.component(components[component].name, components[component]);
  }
}

export default { install };
export {
  components,
};
*/
// export * from './components/index';
/* import TextButton from '@/components/text-button/TextButton.vue';
import BaseInput from '@/components/base-input/BaseInput.vue';
import BaseButton from '@/components/base-button/BaseButton.vue';
import BaseOption from '@/components/base-option/BaseOption.vue';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';

export {
  TextButton,
  BaseButton,
  BaseOption,
  BaseOptionForm,
  BaseInput,
}; */
// export * from './components/index';
/*
import TextButton from '@/components/text-button/TextButton.vue';
import BaseInput from '@/components/base-input/BaseInput.vue';
import BaseButton from '@/components/base-button/BaseButton.vue';
import BaseOption from '@/components/base-option/BaseOption.vue';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';
import '@/assets/styles/lib.scss';

const components = {
  TextButton,
  BaseButton,
  BaseOption,
  BaseOptionForm,
  BaseInput,
};

function install(instance) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const component in components) {
    instance.component(components[component].name, components[component]);
  }
}

export default { install }; */

/* export { default as TextButton } from '@/components/text-button/TextButton.vue';
export { default as BaseInput } from '@/components/base-input/BaseInput.vue';
export { default as BaseButton } from '@/components/base-button/BaseButton.vue';
export { default as BaseOption } from '@/components/base-option/BaseOption.vue';
export { default as BaseOptionForm } from '@/components/base-option-form/BaseOptionForm.vue'; */

/* import '@/assets/styles/lib.scss';
import * as components from '@/components/index';

// install function executed by Vue.use()
const install = (app) => {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index'; */
import '@/assets/styles/lib.scss';
import { defineCustomElement } from 'vue';
import * as components from '@/components/index';

/**
 * Convert kebab-case to camelCase
 * @param {string} str
 * @return {string}
 */
const transformCamelCase = (string = '') => string
  .replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());

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
const componentsCollection = { ...components };

// components desc array
const componentsDesc = Object.keys(componentsCollection).map((item) => {
  const component = componentsCollection[item];
  return {
    name: component.name || 'c-comp', // kebab-case
    component,
  };
});

/**
 * Global install Function
 * @param app - Vue instance
 */
function install(app) {
  const apps = [];
  if (apps.includes(app)) return;
  apps.push(app);
  // if (!app || install.installed) {
  /* if (!install.installed) {
    return;
  } */

  componentsDesc.forEach((item) => {
    const kebabCaseName = transformKebabCase(item.name);
    const camelCaseName = transformCamelCase(item.name);
    const registerComponent = item.component;
    app.component(kebabCaseName, registerComponent); // kebab-case
    app.component(camelCaseName, registerComponent); // camelCase
    // app.use(registerComponent);
  });
  // install.installed = true;
}

// Create module definition for Vue.use()
/* const plugin = {
  install,
}; */

// Auto-install when vue is found (eg. in browser via <script> tag)
/* let GlobalVue = null;
if (typeof window !== 'undefined') {
  window.CustomerComponents = (app) => install(app);
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  // const { createApp } = GlobalVue;
  const globalApp = createApp();
  globalApp.use(install);
  console.log('global App', globalApp);
  console.log('GlobalVue App', GlobalVue);
  console.log('window Vue', window.Vue);
} */

/**
 * Install Component as Web Component
 * @param {string} tagName - web component name in kebab-case
 * @param {object} component - Vue Component
 */
const installWebComponent = function (tagName, component) {
  if (!tagName || !component) {
    return;
  }
  const validName = transformKebabCase(tagName);
  window.customElements.define(validName, defineCustomElement(component));
};

/**
 * Register all Components as Web Component, prefix with 'web-'
 */
const installWebComponents = function () {
  componentsDesc.forEach((item) => {
    installWebComponent(`web-${item.name}`, item.component);
  });
};

export * from '@/components/index';
export {
  installWebComponent,
  installWebComponents,
};

export default install;
