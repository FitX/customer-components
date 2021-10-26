import { ref, reactive, computed, onMounted } from 'vue';
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
import '../../../.storybook/code-highlight.scss';
import { isDarkMode } from '../../../.storybook/template-helpers/use-template-theme-detection';
import SlotSelect from './SlotSelect.vue';

const storyDescription = `
# (Termin buchen)
## Verhalten:
- Default: der erste freie Tag ist vorausgewählt, alle verfügbaren Zeiten werden angezeigt
- Deaktivierte Slots sind nicht klickbar
- Auf Mobil/Tablet werden so viele Tage wie möglich anzeigt und horizontal gescrollt
- Im Web wird immer eine ganze Woche angezeigt mit Buttonklick die nächste/vorige (@TODO: momentan nur Touch UI)
- Für die Slots wird die BaseOption Komponente benutzt
`;

/**
 * Helpers
 */
/**
 * Get Random Number
 * @param {number} max
 * @return {number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/**
 * Get Hour Interval
 * @type {number} - 1 Hour
 */
const hourInterval = 1000 * 60 * 60;
/**
 * Get Day Interval
 * @type {number} - 1 Day
 */
const dayInterval = hourInterval * 24;
/**
 * Get Dates by Range
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} interval
 * @return {Date[]}
 */
function getDates(startDate = new Date(), endDate = new Date(), interval = dayInterval) {
  const duration = endDate - startDate;
  const steps = duration / interval;
  return Array
    .from({length: steps + 1}, (v, i) => new Date(startDate.valueOf() + (interval * i)));
}

/**
 * Add Days to Date Object
 * @param {Date} date - date to add
 * @param {number} days - days to add
 * @return {Date} Date with added Days
 */
function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

/**
 * Add Hours to Date Object
 * @param {Date} date - date to add
 * @param {number} hours - Hours to add
 * @return {Date} Date with added Hours
 */
function addHours(date, hours) {
  const copy = new Date(Number(date))
  copy.setTime(date.getTime() + (hourInterval * hours))
  return copy
}

/**
 * Today
 * @type {Date}
 */
const startDate = new Date();
/**
 * Demo End Date
 * @type {Date}
 */
const endDate = addDays(startDate, 13);

const days = getDates(startDate, endDate);

/**
 * Generate Demo Calendar Slots
 * @type {{sub: *, slots: string[], disabled: boolean, title: *}[]}
 */
const demoSlots = days.map((day, index) => {
  // const slots = ['slot 1', 'slot 2'];
  /**
   * Generate Time Slots from day with randomized Hours
   * and map them to readable Content
   * @type {Date[]}
   */
  const slots = getDates(day, addHours(day, getRandomInt(5)), hourInterval)
    .map((hour) => {
      const hourOptions = {
        hour: '2-digit',
        minute: '2-digit',
      };
      return `${hour.toLocaleTimeString('de-DE', hourOptions)} - ${addHours(hour, 1).toLocaleTimeString('de-DE', hourOptions)}`;
    });
  return {
    disabled: index === 0 || index === getRandomInt(7), // Random disable
    title: day.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'numeric',
    }),
    sub: day.toLocaleDateString('de-DE', {
      weekday: 'short',
    }),
    slots,
  }
});

/**
 * @type {import('./SlotSelect.vue').SlotSelectItemsModel} demoSlots
 */
const demoSlots3 = [
  {
    title: 'title 1',
    sub: 'sub 1',
    slots: [
      'slot 1',
      'slot 2',
    ]
  },
  {
    title: 'title 2',
    disabled: true,
    sub: 'sub 2',
    slots: [
      'slot 1',
      'slot 2',
    ]
  }
];

const demoSlots2 = [...Array(14).keys()].map((index) => {
  const disabled = index === getRandomInt(7) && index !== 1; // Random disable
  const title = `Title ${index}`;
  const sub = `Sub ${index}`;
  const count = getRandomInt(7) || 1;
  const slots = [...Array(count).keys()].map((index) => `slot ${index}`);
  return {
    title,
    sub,
    disabled,
    slots,
  }
})

export default {
  title: 'Components/Slot Select',
  component: SlotSelect,
  parameters: {
    jest: ['SlotSelect.unit.spec.js'],
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
export const SlotSelectDefault = (args) => ({
  components: {
    SlotSelect,
  },
  methods: {
    select(selectedIndex) {
      if (this.items[selectedIndex].disabled) {
        console.log('Prevent disabled Day');
      } else {
        this.items.forEach((day, index) => {
          if (index !== selectedIndex) {
            day.selected = false;
          } else {
            day.selected = true;
          }
        });
      }
    }
  },
  data() {
    return {
      ...args,
      selectedSlot: null,
      isDarkMode,
    }
  },
  template: `<slot-select @select-title="select" :items="items" />`,
});

SlotSelectDefault.storyName = 'Slot Select';
SlotSelectDefault.args = {
  items: reactive(demoSlots2),
};

export const SlotSelectDemo = () => ({
  components: {
    SlotSelect,
  },
  setup() {
    const selectedTitle = ref(null);
    const selectedSlot = ref(null);
    const dates = ref(demoSlots);
    const selectDay = (selectedIndex) => {
      dates.value.forEach((day, index) => {
        if (index !== selectedIndex) {
          day.selected = false;
        } else {
          day.selected = true;
        }
      });
    };
    const selectTitle = (index) => {
      const checkIfItemIsDisabled = dates.value[index].disabled;
      if (checkIfItemIsDisabled) {
        selectedTitle.value = 'Deaktivierte Slots sind nicht klickbar <3';
      } else {
        selectDay(index);
        selectedTitle.value = {
          index,
          item: dates.value[index].title,
        };
      }
    };
    const selectSlot = (slotIndex) => {
      selectedSlot.value = {
        slotIndex,
        item: dates.value.find((day) => day.selected).slots[slotIndex],
      };
    };
    const demoOutput = computed(() => {
      return `Termin: ${selectedTitle.value?.item} um ${selectedSlot.value?.item}`;
    });

    /**
     * Get first Day contains slots and is not disabled
     */
    const selectDefaultDay = () => {
      const indexOfDefaultDay = dates.value
        .findIndex((day) => (!day.disabled && day.slots.length > 0));
      selectTitle(indexOfDefaultDay);
    };
    /**
     * Select first free Day
     */
    selectDefaultDay();

    onMounted(() => {
      Prism.highlightAll();
    });
    return {
      selectedTitle,
      selectedSlot,
      dates,
      selectTitle,
      selectSlot,
      demoOutput,
      isDarkMode,
    };
  },
  template: `
  <div
    :style="isDarkMode ? 'color: #fff;' : 'color: #000;'"
    style="
        margin-bottom: 2rem;">
    <h3>Demo</h3>
    <p>{{ demoOutput }}</p>
    <dl style="display: grid; grid-template-columns: auto 1fr; min-height: 5rem">
      <dt>selectedTitle:</dt>
      <dd>{{ selectedTitle }}</dd>
      <dt>selectedSlot:</dt>
      <dd>{{ selectedSlot }}</dd>
    </dl>
    <details>
      <summary>
        Code Ouput Dates
      </summary>
      <pre class="prismjs">
        <code class="language-js">
{{ dates }}
        </code>
      </pre>
    </details>
  </div>
  <slot-select
    @select-title="selectTitle"
    @select-slot="selectSlot"
    :is-dark-mode="isDarkMode"
    :items="dates" />
  `,
});

SlotSelectDemo.storyName = 'Demo';
