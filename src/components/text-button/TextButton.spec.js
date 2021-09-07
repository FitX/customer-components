import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import TextButton from '@/components/text-button/TextButton.vue';

describe('TextButton', () => {
  it('renders as button as link', () => {
    const wrapper = shallowMount(TextButton);
    const element = `<a class="btn"><span class="btn__icon"></span><span class="btn__text"></span></a>`;
    expect(wrapper.html()).toMatch(element);
  });

  it('has modifier options', () => {
    // button', 'a', 'div', 'span'
    const wrapper = shallowMount(TextButton, {
      props: { tag: 'button' },
    });
    const buttonElement = '<button class="btn"><span class="btn__icon"></span><span class="btn__text"></span></button>';
    expect(wrapper.html()).toMatch(buttonElement);

    const wrapperSpan = shallowMount(TextButton, {
      props: { tag: 'span' },
    });
    const spanElement = '<span class="btn"><span class="btn__icon"></span><span class="btn__text"></span></span>';
    expect(wrapperSpan.html()).toMatch(spanElement);
  });

  it('shows text', () => {
    const wrapper = shallowMount(TextButton, {
      props: { text: 'hello world' },
    });
    expect(wrapper.text()).toContain('hello world');
  });

  it('has disabled state', () => {
    const wrapper = shallowMount(TextButton, {
      props: { modifier: 'disabled' },
    });
    const button = wrapper.find('a');
    expect(button.element).toHaveClass('btn--disabled');
  });

  it('validates modifier input', () => {
    const wrapper = shallowMount(TextButton, {
      props: { modifier: ['disabled', 'frank'] },
    });
    const button = wrapper.find('a');
    expect(button.element).toHaveClass('btn--disabled');
  });
});
