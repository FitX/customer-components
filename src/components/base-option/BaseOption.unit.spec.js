import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseOption from '@/components/base-option/BaseOption.vue';

describe('Base Button', () => {
  it('renders as button as default', () => {
    const wrapper = shallowMount(BaseOption);
    expect(wrapper.html()).toMatch('<button class="btn"><span class="btn__content"><span class="btn__additional"></span></span></button>');
  });

  it('shows title and text', () => {
    const wrapper = shallowMount(BaseOption, {
      props: {
        title: 'hello world',
        text: 'foo bar',
      },
    });
    expect(wrapper.text()).toContain('hello world');
    const text = wrapper.find('.btn__additional');
    expect(text.text()).toContain('foo bar');
  });

  it('has correct modifier classes', () => {
    const wrapper = shallowMount(BaseOption, {
      props: { modifier: 'disabled' },
    });
    const button = wrapper.find('button');
    expect(button.element).toHaveClass('btn--disabled');
  });
});
