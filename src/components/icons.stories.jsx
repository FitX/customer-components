import { ref } from 'vue';
import IconCheckmark from '@/assets/icons/icon-checkmark.svg';
import IconAttention from '@/assets/icons/icon-attention.svg';

const iconList = [
  {
    component: IconCheckmark,
    name: 'Checkmark',
    source: 'https://icons8.com/icon/3061/checkmark',
  },
  {
    component: IconAttention,
    name: 'Attention',
    source: 'https://icons8.com/icon/11691/box-important',
  }
];

export default {
  title: 'Styleguide/Icons',
  // component: ColorPalette,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export const Colors = () => ({
  setup() {
    const detail = ref({});
    function showDetail(componentName) {
      detail.value = iconList
        .filter((icon) => icon.name === componentName)?.[0];
    }
    return {
      detail,
      showDetail,
      iconList,
    };
  },
  template: `
  <section>
    <h1>{{ detail.name }}</h1>
    <a :href="detail.source" target="_blank" v-if="detail.source">Quelle</a>
  </section>
  <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap;">
    <li
      v-for="icon in iconList"
      :index="icon.name"
      style="border: 1px solid red; line-height: 0;"
      @click="showDetail(icon.name)">
      <component :is="icon.component" />
    </li>
  </ul>
  `,
});
