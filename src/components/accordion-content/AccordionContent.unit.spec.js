import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AccordionContent from '@/components/accordion-content/AccordionContent.vue';

describe('Accordion', () => {
  test('renders default', () => {
    const wrapper = shallowMount(AccordionContent, {
      props: {
        content: 'Hello world',
      },
    });
    const content = wrapper.find('.accordion');
    expect(content.text()).toContain('Hello world');
  });
});
