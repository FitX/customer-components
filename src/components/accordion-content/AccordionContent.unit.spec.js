import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AccordionWrapper from '@/components/accordion-content/AccordionWrapper.vue';

describe('Accordion', () => {
  test('renders default', () => {
    const wrapper = shallowMount(AccordionWrapper, {
      props: {
        content: 'Hello world',
      },
    });
    const content = wrapper.find('.accordion');
    expect(content.text()).toContain('Hello world');
  });
});
