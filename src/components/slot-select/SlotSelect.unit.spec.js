import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import { nextTick } from 'vue';
import SlotSelect from './SlotSelect.vue';

const demoSlots = [
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
]

describe('Requirements List', () => {
  it('renders with default values', () => {
    const wrapper = shallowMount(SlotSelect);
    const tabsEl = wrapper.find('.tabs').element;
    expect(tabsEl.children).toHaveLength(0);
  });

  it('displays tabs', () => {
    const wrapper = shallowMount(SlotSelect, {
      props: {
        items: demoSlots,
      }
    });
    const tabsEl = wrapper.find('.tabs').element;
    expect(tabsEl.children).toHaveLength(2);
  });

  it('has dark mode option', async () => {
    const wrapper = shallowMount(SlotSelect);
    const comp = wrapper.find('.slot-select');
    expect(comp.element).not.toHaveClass('slot-select--dark');
    await wrapper.setProps({ isDarkMode: true });
    expect(comp.element).toHaveClass('slot-select--dark');
  });

  const selectTab = async (wrapper, tabIndex = 0) => {
    const arrayIndexToCssChild = tabIndex + 1;
    const tab = wrapper.find(`.tabs__item:nth-child(${arrayIndexToCssChild})`);
    await tab.trigger('click');
  };

  it('emits tab select with tab index on click', async () => {
    const wrapper = shallowMount(SlotSelect, {
      props: {
        items: demoSlots,
      }
    });
    await selectTab(wrapper);
    expect(wrapper.emitted()).toHaveProperty('select-title');
    expect(wrapper.emitted('select-title')[0]).toEqual([0]);
  });

  it('emits slot select with slot index on click', async () => {
    const wrapper = shallowMount(SlotSelect, {
      props: {
        items: demoSlots,
      }
    });
    const tabIndexToSelect = 1;
    await selectTab(wrapper, tabIndexToSelect);
    wrapper.vm.$props.items[tabIndexToSelect].selected = true;
    await nextTick();
    const slot = wrapper.find('.slots__button');
    await slot.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('select-slot');
    expect(wrapper.emitted('select-slot')[0]).toEqual([0]);
  });
});
