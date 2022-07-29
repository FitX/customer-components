import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AccordionWrapper from '@/components/accordion-content/AccordionWrapper.vue';
import AccordionItem from '@/components/accordion-content/AccordionItem.vue';

describe('Accordion', () => {
  test('renders default', () => {
    const wrapper = shallowMount(AccordionWrapper);
    const content = wrapper.find('.accordion');
    expect(content).toBeTruthy();
  });
  test('renders slot', () => {
    const wrapper = shallowMount(AccordionWrapper, {
      slots: {
        default: 'Hier könnte ihr Text stehen',
      },
    });
    const content = wrapper.find('.accordion');
    expect(content.html()).toContain('Hier könnte ihr Text stehen');
  });
  test('renders darkMode', () => {
    const wrapper = shallowMount(AccordionWrapper, {
      props: {
        isDarkMode: true,
      },
    });
    const content = wrapper.find('.accordion');
    expect(content.html()).toContain('accordion--dark');
  });
});

describe('Accordion Item', () => {
  test('renders default', () => {
    const wrapper = shallowMount(AccordionItem);
    const content = wrapper.find('.accordion-item');
    expect(content.exists()).toBe(true);
  });
  test('renders slots', () => {
    const wrapper = shallowMount(AccordionItem, {
      slots: {
        title: 'Acc Title',
        content: 'Acc Content',
      },
    });
    const title = wrapper.find('.accordion-item__title-content');
    const content = wrapper.find('.accordion-item__panel');
    expect(title.text()).toContain('Acc Title');
    expect(content.text()).toContain('Acc Content');
  });
  test('renders darkMode', () => {
    const wrapper = shallowMount(AccordionItem, {
      props: {
        isDarkMode: true,
      },
    });
    expect(wrapper.html()).toContain('accordion-item--dark');
  });
  test('renders via items', () => {
    const wrapper = shallowMount(AccordionItem, {
      props: {
        item: {
          title: 'Title 1',
          content: 'Description',
        },
      },
    });
    const title = wrapper.find('.accordion-item__title-content');
    const content = wrapper.find('.accordion-item__panel');
    expect(title.text()).toContain('Title 1');
    expect(content.text()).toContain('Description');
  });
  test('toggle works', async () => {
    const wrapper = mount(AccordionItem, {
      propsData: {
        index: 5,
        modelValue: 1,
        item: {
          title: 'title',
          content: 'content',
        },
      },
    });
    expect(wrapper.get('.accordion-item__panel').isVisible()).toBe(false);
    await wrapper.setProps({
      modelValue: 5,
    });
    expect(wrapper.get('.accordion-item__panel').isVisible()).toBe(true);
  });
  test('update add works with number', async () => {
    const wrapper = mount(AccordionItem, {
      propsData: {
        index: 5,
        modelValue: 1,
        item: {
          title: 'title',
          content: 'content',
        },
      },
    });
    const trigger = wrapper.get('.accordion-item__trigger');
    await trigger.trigger('click');
    const updateEvent = wrapper.emitted('update:modelValue');
    expect(updateEvent[0]).toEqual([5]);
  });
  test('update add works with array', async () => {
    const wrapper = mount(AccordionItem, {
      propsData: {
        index: 5,
        modelValue: [1],
        item: {
          title: 'title',
          content: 'content',
        },
      },
    });
    const trigger = wrapper.get('.accordion-item__trigger');
    await trigger.trigger('click');
    const updateEvent = wrapper.emitted('update:modelValue');
    expect(updateEvent[0]).toEqual([[1,5]]);
  });
  test('update remove works with array', async () => {
    const wrapper = mount(AccordionItem, {
      propsData: {
        index: 5,
        modelValue: [1, 5],
        item: {
          title: 'title',
          content: 'content',
        },
      },
    });
    const trigger = wrapper.get('.accordion-item__trigger');
    await trigger.trigger('click');
    const updateEvent = wrapper.emitted('update:modelValue');
    expect(updateEvent[0]).toEqual([[1]]);
  });
});
