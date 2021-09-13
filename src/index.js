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

export default { install };

export { default as TextButton } from '@/components/text-button/TextButton.vue';
export { default as BaseInput } from '@/components/base-input/BaseInput.vue';
export { default as BaseButton } from '@/components/base-button/BaseButton.vue';
export { default as BaseOption } from '@/components/base-option/BaseOption.vue';
export { default as BaseOptionForm } from '@/components/base-option-form/BaseOptionForm.vue';
