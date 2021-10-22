import { ref, reactive } from 'vue';
import SlotSelect from './SlotSelect.vue';

const storyDescription = `
# @TODO
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
    disabled: index === 3,
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
const demoSlots2 = [
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
    sub: 'sub 2',
    slots: [
      'slot 1',
      'slot 2',
    ]
  }
];

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
  data() {
    return {
      ...args,
      selectedSlot: null,
    }
  },
  template: `<slot-select :items="items" />`,
});

SlotSelectDefault.storyName = 'Slot Select';
SlotSelectDefault.args = {
  items: reactive(demoSlots),
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
    return {
      selectedTitle,
      selectedSlot,
      dates,
      selectTitle,
      selectSlot,
    };
  },
  template: `
  <div
      style="
        margin-bottom: 2rem;">
    <h3>Demo</h3>
    <dl>
      <dt>selectedTitle:</dt>
      <dd>{{ selectedTitle }}</dd>
      <dt>selectedSlot:</dt>
      <dd>{{ selectedSlot }}</dd>
    </dl>
  </div>
  <hr>
  <slot-select
    @select-title="selectTitle"
    @select-slot="selectSlot"
    :items="dates" />
  `,
});

SlotSelectDemo.storyName = 'Demo';
