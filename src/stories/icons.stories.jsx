import IconCheckmark from '@/assets/icons/icon-checkmark.svg';
import IconError from '@/assets/icons/icon-error.svg';
import IconClear from '@/assets/icons/icon-clear.svg';
import IconClose from '@/assets/icons/icon-close.svg';
import IconBack from '@/assets/icons/icon-back.svg';
import IconInfo from '@/assets/icons/icon-info.svg';
import IconVote1 from '@/assets/icons/icon-vote-1.svg';
import IconVote2 from '@/assets/icons/icon-vote-2.svg';
import IconVote3 from '@/assets/icons/icon-vote-3.svg';
import IconVote4 from '@/assets/icons/icon-vote-4.svg';
import IconVote5 from '@/assets/icons/icon-vote-5.svg';
import IconList from '@/doc-helper/IconList.vue';

const CATEGORY_ENUMS = {
  SYSTEM: 'System Icons',
  CUSTOM: 'Custom Design Icons',
};

const storyDescription = `
  **Verwendung:**

  - Angelegt zentriert im Rahmen 18 x 18 px
  - Icongröße darin optisch angepasst
  - Namen auf Englisch
  - Default Farbwert anthrazit
`;

const iconList = [
  {
    component: IconCheckmark,
    name: 'Checkmark',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/3061/checkmark',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconError,
    name: 'Error',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/11691/box-important',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconClear,
    name: 'Clear',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/59754/cancel',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconClose,
    name: 'Close',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/83149/delete',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconBack,
    name: 'Back',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/set/back/ios-filled',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconInfo,
    name: 'Info',
    source: {
      name: 'icons8',
      url: 'https://icons8.com/icon/77/info',
    },
    category: CATEGORY_ENUMS.SYSTEM,
  },
  {
    component: IconVote1,
    name: 'IconVote1',
    source: {
      name: 'Mona',
    },
    category: CATEGORY_ENUMS.CUSTOM,
  },
  {
    component: IconVote2,
    name: 'IconVote2',
    source: {
      name: 'Mona',
    },
    category: CATEGORY_ENUMS.CUSTOM,
  },
  {
    component: IconVote3,
    name: 'IconVote3',
    source: {
      name: 'Mona',
    },
    category: CATEGORY_ENUMS.CUSTOM,
  },
  {
    component: IconVote4,
    name: 'IconVote4',
    source: {
      name: 'Mona',
    },
    category: CATEGORY_ENUMS.CUSTOM,
  },
  {
    component: IconVote5,
    name: 'IconVote5',
    source: {
      name: 'Mona',
    },
    category: CATEGORY_ENUMS.CUSTOM,
  },
];
export default {
  title: 'Styleguide/Icons',
  // component: IconList,
  parameters: {
    options: {
      showPanel: false,
    },
    docs: {
      description: {
        component: storyDescription,
      },
    },
  },
};

export const Icons = () => ({
  components: {
    IconList,
    // ColorSlider,
  },
  setup() {
    return {
      iconList,
    };
  },
  template: `
    <icon-list :icons="iconList"/>`,
});

export const InfoForDevs = () => ({
  template: `
  Die Icons können per <i>vue-svg-loader</i> bzw. <i>vite-svg-loader</i> als Komponenten genutzt werden.
  Momentan werden die Icons nicht als Componenten mit ausgeliefert.
  `,
});
InfoForDevs.storyName = 'Dev Info';

InfoForDevs.parameters = {
  docs: {
    description: {
      story: 'Alle Icons sind in `./src/assets/icons/` abgelegt und werden raw mit ausgeliefert.',
    },
  },
};
