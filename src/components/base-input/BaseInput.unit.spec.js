import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseInput from '@/components/base-input/BaseInput.vue';

describe('Base Input', () => {
  it('renders input as default', () => {
    const wrapper = shallowMount(BaseInput);
    // remove whitespace and remove v-if https://jaketrent.com/post/remove-whitespace-html-javascript
    const wrapperHtml = wrapper.html()
      .replace(/\n/g, "")
      .replace(/[\t ]+\</g, "<")
      .replace(/\>[\t ]+\</g, "><")
      .replace(/\>[\t ]+$/g, ">")
      .replace(/<!--v-if-->/gi, '');
    expect(wrapperHtml).toMatch('<div class=""><label class="field"><input class="field__input"><span class="field__btn-wrapper"></span></label></div>');
  });

  it('shows label', async () => {
    const wrapper = shallowMount(BaseInput, {
      props: {
        label: 'John Doe',
      },
    });
    const label = wrapper.find('.field__text');
    expect(label.text()).toContain('John Doe');
  });

  it('displays validate icon', async () => {
    const wrapper = shallowMount(BaseInput);

    const input = wrapper.find('input');

    expect(input.element.value).toBe('');
    expect(wrapper.vm.$props.modelValue).toBe(null);
    expect(wrapper.vm.$props.isValid).toBe(false);

    await wrapper.setProps({
      isValid: true,
      modelValue: 'Frank',
    });
    expect(wrapper.find('.valid-icon').exists()).toBeTruthy();
  });

  it('has error state', async () => {
    const wrapper = shallowMount(BaseInput);

    const input = wrapper.find('input');

    await wrapper.setProps({
      errorMessage: 'This is an error',
    });
    expect(wrapper.find('label').element).toHaveClass('field--error field');
    expect(wrapper.find('.error-message').exists()).toBeTruthy();
    expect(wrapper.find('.error-message').attributes('error-message')).toBe('This is an error');
  });

  it('sets not empty and autofilled classes ', async () => {
    const wrapper = shallowMount(BaseInput);
    await wrapper.setProps({
      modelValue: 'Some value',
    });
    expect(wrapper.find('input').element).toHaveClass('field__input--not-empty');
    // expect(wrapper.find('input').element).toHaveClass('field__input--auto-filled');
  });

  it('has correct modifier classes', () => {
    const wrapper = shallowMount(BaseInput, {
      props: { modifier: 'disabled' },
    });
    const el = wrapper.find('label').element;
    expect(el).toHaveClass('field--disabled');
  });
});
