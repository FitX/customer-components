import { shallowMount, mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseInput from '@/components/base-input/BaseInput.vue';

describe('Base Input', () => {
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
    expect(wrapper.find('.error-message').attributes('errormessage')).toBe('This is an error');
  });

  it('sets not empty and autofilled classes ', async () => {
    const wrapper = shallowMount(BaseInput);
    await wrapper.setProps({
      modelValue: 'Some value',
    });
    expect(wrapper.find('input').element).toHaveClass('field__input--not-empty');
  });

  it('has correct modifier classes', () => {
    const wrapper = shallowMount(BaseInput, {
      props: { modifier: 'disabled' },
    });
    const el = wrapper.find('label').element;
    expect(el).toHaveClass('field--disabled');
  });

  it ('updates model', () => {
    const wrapper = shallowMount(BaseInput);
    const input = wrapper.find('input');
    input.setValue('Frank');
    expect(wrapper.emitted()).toBeTruthy();
  });

  it ('set focus class', async () => {
    const wrapper = shallowMount(BaseInput);
    const label = wrapper.find('label').element;
    expect(label).not.toHaveClass('field--fake-focus field');
    const input = wrapper.find('input');
    await input.trigger('focus');
    expect(label).toHaveClass('field--fake-focus field');

    await input.trigger('blur');
    expect(label).not.toHaveClass('field--fake-focus field');
    expect(label).toHaveClass('field');
  });

  it ('clears input', async () => {
    const wrapper = shallowMount(BaseInput);
    const input = wrapper.find('input');
    expect(input.text()).toBe('');
    await wrapper.setProps({
      modelValue: 'Frank',
      clearable: true,
    });
    expect(wrapper.vm.modelValue).toBe('Frank');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('cleared')).toHaveLength(1);
  });
});
