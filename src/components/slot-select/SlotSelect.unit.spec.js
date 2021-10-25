import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import { nextTick } from 'vue';
import RequirementsList from '@/components/requirements-list/RequirementsList.vue';

const rules = [
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
  }
];

describe('Requirements List', () => {
  it('renders with default values', () => {
    const wrapper = shallowMount(RequirementsList);
    const items = wrapper.find('ul').element;
    expect(items.children).toHaveLength(0);
  });

  it('displays rules', () => {
    const wrapper = shallowMount(RequirementsList, {
      props: {
        items: rules,
      }
    });
    const items = wrapper.find('ul').element;
    expect(items.children).toHaveLength(2);
  });

  it('has dark mode option', async () => {
    const wrapper = shallowMount(RequirementsList);
    const div = wrapper.find('.requirements');
    expect(div.element).not.toHaveClass('requirements--dark');
    await wrapper.setProps({ isDarkMode: true });
    expect(div.element).toHaveClass('requirements--dark');
  });

  it('emits value when all items are valid', async () => {
    const wrapper = shallowMount(RequirementsList, {
      props: {
        items: rules,
      }
    });
    wrapper.vm.$props.items[0].done = true;
    wrapper.vm.$props.items[1].done = true;
    await nextTick();
    expect(wrapper.emitted()).toHaveProperty('all-done');
    expect(wrapper.emitted('all-done')[0]).toEqual([true]);
  });
});
