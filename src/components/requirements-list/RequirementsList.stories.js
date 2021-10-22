import { ref, reactive } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import RequirementsList from './RequirementsList.vue';

const storyDescription = `
## (Anforderungsliste)

- Alle Anforderungen müssen erfüllt werden
- Validierung ausserhalb der Komponente
`;

/**
 * @type {import('./RequirementsList.vue').RequirementItemsModel} demoRequirements
 */
const demoRequirements = [
  {
    title: 'Mindestens 8 Zeichen',
    done: false,
    rule(value = '') {
      const valid = value.length >= 8;
      this.done = valid;
      return valid;
    },
  },
  {
    title: 'Enthält eine Zahl',
    done: false,
    rule(value = '') {
      const valid = /\d/.test(value);
      this.done = valid;
      return valid;
    },
  },
  {
    title: 'Enthält ein Sonderzeichen',
    done: false,
    rule(value = '') {
      const valid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      this.done = valid;
      return valid;
    },
  },
  {
    title: 'Enthält einen Großbuchstabe',
    done: false,
    rule(value = '') {
      const valid = /[A-Z]/.test(value);
      this.done = valid;
      return valid;
    },
  },
  {
    title: 'Enthält einen Kleinbuchstabe',
    done: false,
    rule(value = '') {
      const valid = /[a-z]/.test(value);
      this.done = valid;
      return valid;
    },
  }];

export default {
  title: 'Components/Requirements List',
  component: RequirementsList,
  parameters: {
    jest: ['RequirementsList.unit.spec.js'],
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
};

//* ******************************** */
/// Stories
/* ******************************** */
export const RequirementsListDefault = () => ({
  components: {
    RequirementsList,
  },
  data() {
    return {
      value: null,
      items: demoRequirements,
      isDarkMode,
    }
  },
  template: `<requirements-list :is-dark-mode="isDarkMode" :items="items" />`,
});

RequirementsListDefault.storyName = 'Anforderungsliste';

export const RequirementsListDemo = () => ({
  components: {
    RequirementsList,
  },
  data() {
    return {
      value: null,
      allDone: false,
      items: demoRequirements,
      isDarkMode,
    }
  },
  methods: {
    validate() {
      this.items.forEach((item) => item.rule(this.value));
    },
    getAllDone(value) {
      this.allDone = value;
    },
  },
  template: `
  <form>
    <label
      style="
        display: inline-grid;
        gap: 1rem;
        grid-template-columns: auto auto auto;
        align-items: center;
        align-content: center;
        margin-bottom: 2rem;"
      :style="isDarkMode ? 'color: #fff;' : 'color: #000;'">
      Demo
      <input
        v-model="value"
        @input="validate"
        type="text">
      <span><small v-if="allDone">Alle Felder valide.</small></span>
    </label>
  </form>
  <requirements-list
    @allDone="getAllDone"
    :is-dark-mode="isDarkMode"
    :items="items" />
  `,
});

RequirementsListDemo.storyName = 'Demo';
