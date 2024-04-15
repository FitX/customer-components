import { reactive, ref } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import AccordionWrapper from './AccordionWrapper.vue';
import AccordionItem from './AccordionItem.vue';
import BaseInput from '../base-input/BaseInput.vue';

const storyDescription = `
- Default: unausgewählt
- Bei Auswahl klappt es sich aus
- Bei Auswahl des Geschlossenen klappt sich das Offene wieder ein
- Inhalt je nach Anwendung flexibel
`;

const sepaImg = 'data:image/png;base64,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';

export default {
  title: 'Components/Accordion',
  component: AccordionWrapper,
  argTypes: {
    modifier: {
      control: {
        type: 'select',
      },
    },
    // ...eventListener,
  },
  parameters: {
    jest: ['AccordionContent.unit.spec.js'],
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
};

/* ******************************** */
/// Templates
/* ******************************** */
/**
 * Info Box Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<div style="font-size: 16px">
<accordion-wrapper v-bind="args">
    <accordion-item
    v-for="(item, index) in args.items"
    :is-dark-mode="args.isDarkMode"
    :key="index"
    :index="index"
    :item="item"
    v-model="args.model" />
</accordion-wrapper>
</div>`;

const customTemplate = `
<accordion-wrapper id="complex-demo">
<accordion-item
  v-model="selectedAccordion"
  :index="0"
>
<template #title>
     <span class="header" style="display: grid; grid-template-columns: 1fr 90px; text-align: left; align-items: center; gap: 1rem; justify-content: space-between; width: 100%">
       <span
       style="font-size: 18px; display: block"
       class="header__title">
       SEPA Lastschrift
        <span
          style="font-size: 14px; font-weight: 300; display: block; margin-top: 10px"
          class="header__sub-title">Gib deine Bankverbindung ein, um per SEPA-Lastschrift zu bezahlen.</span>
       </span>
       <img :src="sepaImg" alt="logo SEPA" width="90">
     </span>
  </template>
  <template #content>
    <base-input label="Vor- und Nachname Kontoinhaber" />
    <p><base-input label="IBAN" /></p>
  </template>
</accordion-item>
<accordion-item
  v-model="selectedAccordion"
  :index="1"
>
  <template #title>
     <span class="header" style="display: grid; grid-template-columns: 1fr 90px; text-align: left; align-items: center; gap: 1rem; justify-content: space-between; width: 100%">
       <span
       style="font-size: 18px; display: block"
       class="header__title">
       Firmenfitness
        <span
          style="font-size: 14px; font-weight: 300; display: block; margin-top: 10px"
          class="header__sub-title">Bitte auswählen, wenn du Firmenkunde bist und einen FitX-Gutschein hast.

</span>
       </span>
     </span>
  </template>
  <template #content>
    <base-input label="Vor- und Nachname Kontoinhaber 2" />
    <p><base-input label="IBAN 2" /></p>
  </template>
  </accordion-item>
</accordion-wrapper>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */
/**
 * Default Template
 * @param {object} argsObject - vue props e.g. {tag: 'button', text: 'Button', isDarkMode: false }
 * @return {{template: string, components: {BaseButton: {setup(): {getModifierClasses: *}, props: {modifier: {default: null, validator: function(*=): (boolean|boolean), type: [StringConstructor, ArrayConstructor]}, isDarkMode: {default: boolean, type: Boolean | BooleanConstructor}, tag: {default: string, type: String | StringConstructor}, text: {default: null, type: String | StringConstructor}}}}, setup(): {args: *}}}
 * @constructor
 */
const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    return {
      args: reactive(args),
    };
  },
  components: {
    AccordionWrapper,
    AccordionItem,
  },
  template: baseTemplate,
});

const CustomTemplate = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const selectedAccordion = ref();
    return {
      args: reactive(args),
      selectedAccordion,
      sepaImg,
    };
  },
  components: {
    AccordionWrapper,
    AccordionItem,
    BaseInput,
  },
  template: customTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultAccordionContent = Template.bind({});
DefaultAccordionContent.args = {
  model: 2,
  id: 'demo',
  items: [
    {
    title: 'Title 1',
    content: 'Description',
    },
    {
      title: 'Title 2',
      content: 'Description 2',
    },
    {
      title: 'Title 3',
      content: 'Description 3',
    }
    ],
};

export const ComplexExample = CustomTemplate.bind({});
ComplexExample.args = {};
