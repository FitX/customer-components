import { reactive, ref, watch } from 'vue';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import AutoSuggest from './AutoSuggest.vue';

const storyDescription = `
## Intelligentes Such-Textfeld
- Breite variabel
- Label ist Beschreibung
- In erster Linie immer Pflichtfeld
- Wenn kein Pflichtfeld, dann in Klammern (optional)
- Logik je nach Anwendung frei wählbar
- Hinweis bei leerer Suchliste optional

## Navigation
- <kbd>Pfeil runter</kbd> navigiert die Ergebnisse und fokusiert diese
- <kbd>Pfeil hoch</kbd> navigiert die Ergebnisse und fokusiert diese
- <kbd>Enter</kbd> im Suchfefld wird der aktuelle Input Value übernommen
- <kbd>Enter</kbd> in der Ergebnisliste wählt das aktuell fokusierte Ergebnis aus
- <kbd>Esc</kbd> schliesst die Ergebnise
- <kbd>Home</kbd> fokusiert das erste Ergebnis
- <kbd>End</kbd> fokusiert das letzte Ergebnis
- <kbd>Tab</kbd> bei öffnet Liste
<style>
kbd {
  padding: 2px 4px;
  white-space: nowrap;
  color: #000;
  background: #eee;
  border-width: 1px 3px 3px 1px;
  border-style: solid;
  border-color: #ccc #aaa #888 #bbb;
  border-radius: 4px;
}
</style>
`;

export default {
  title: 'Components/AutoSuggest',
  component: AutoSuggest,
  argTypes: {
  },
  parameters: {
    jest: ['AutoSuggest.unit.spec.js'],
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
};


/**
 * Utils
 */
function fetchData(url) {
  // Simulate a network request by waiting for a specified amount of time
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Return a random array of data as a response
      // const data = [`0-${url}`, `1-${url}`, `2-${url}`, `3-${url}`, `4-${url}`].map((value) => ({ value }));
      const data = Array
        .from({ length: Math.floor(Math.random() * 11)})
        .map((item, index) => ({ value: `${index}-${url}` }));
      resolve(data);
    }, 300);
  });
}

/* ******************************** */
/// Templates
/* ******************************** */
/**
 * Info Box Template with default Slot
 * @type {string}
 */
const baseTemplate = `
<auto-suggest
    label="Suche nach Buchstaben"
    :suggestions="demoSuggestions"
    id="demo-search-1"
    v-model="searchTerm"
    v-bind="args"></auto-suggest>
    <!--<label>another input for testing tabindex <input v-model="searchTerm"></label>-->`;

const withSlotsTemplate = `
<auto-suggest
    label="Suche"
    :suggestions="demoSuggestions"
    v-model="searchTerm"
    id="demo-search-2"
    :show-no-results="true"
    v-bind="args"
    :show-results-trigger="false"
    class="max-width-demo">
    <template
        v-if="demoSuggestions.length === 0"
        #fallback>
    Hier kann ein Hinweis kommen, wenn die Eingabe in der Sucheliste bisher noch nicht getätigt wurde und somit auch nicht erscheint.
    </template>
    <template
        v-else
        #item="{ item, index }">
        <div class="demo-res-item">
            <img src="https://placehold.co/200x100" alt="" aria-hidden="true">
            <div class="demo-res-item__content">
                <h3>{{ item.value }}</h3>
                <p>{{ contentArray[index] }}</p>
</div>
</div>
</template>
</auto-suggest>
<component v-cloak is="style" scoped>
.max-width-demo { max-width: 500px; margin-inline: auto; }
.max-width-demo *:focus-within { outline: none }
.demo-res-item {
display: grid;
gap: 1rem;
grid-template-columns: 200px 1fr;

:focus & { color: var(--brand-color-orange-1); }

& h3 { margin-top: 0 }
& p { font-size: 1rem; font-weight: 300; max-width: 50ch }
}
</component>`;

/* ******************************** */
/// Story Wrapper
/* ******************************** */

const Template = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const searchTerm = ref('');
    const demoSuggestions = ref([]);
    watch(searchTerm, async (val) => {
      demoSuggestions.value = await fetchData(val);
    });
    return {
      args: reactive(args),
      demoSuggestions,
      searchTerm,
    };
  },
  components: {
    AutoSuggest,
  },
  template: baseTemplate,
});

const TemplateWithSlots = (argsObject) => ({
  setup() {
    const args = argsObject;
    if (typeof args.isDarkMode === 'undefined') {
      args.isDarkMode = isDarkMode;
    }
    const searchTerm = ref('');
    const demoSuggestions = ref([].map((value) => ({ value })));
    watch(searchTerm, async (val) => {
      demoSuggestions.value = await fetchData(val);
    });
    const lorem = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

    const contentArray = Array
      .from({ length: Math.floor(Math.random() * 10) + 1})
      .map((item, index) => (lorem.substring(0, Math.floor(Math.random() * (80 - 5 + 1) + 5))));
      // .substring(0, Math.floor(Math.random() * (80 - 5 + 1) + 5))
    return {
      args: reactive(args),
      demoSuggestions,
      searchTerm,
      contentArray,
    };
  },
  components: {
    AutoSuggest,
  },
  template: withSlotsTemplate,
});

//* ******************************** */
/// Stories
/* ******************************** */
export const DefaultAutoSuggest = Template.bind({});
DefaultAutoSuggest.args = {};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {};
WithSlots.storyName = 'With Item + Fallback Slots';
