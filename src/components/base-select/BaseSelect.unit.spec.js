import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseSelect from '@/components/base-select/BaseSelect.vue';

describe('Base Select', () => {
  it('shows label', async () => {
    const wrapper = shallowMount(BaseSelect, {
      props: {
        label: 'John Doe',
      },
    });
    const label = wrapper.find('.field__text');
    expect(label.text()).toContain('John Doe');
  });

  it('displays icon', async () => {
    const wrapper = shallowMount(BaseSelect);
    expect(wrapper.find('.field__icon').exists()).toBeTruthy();
  });

  it('has error state', async () => {
    const wrapper = shallowMount(BaseSelect);

    const input = wrapper.find('input');

    await wrapper.setProps({
      errorMessage: 'This is an error',
    });
    expect(wrapper.find('label').element).toHaveClass('field--error field');
    expect(wrapper.find('.error-message').exists()).toBeTruthy();
    expect(wrapper.find('.error-message').attributes('errormessage')).toBe('This is an error');
  });

  it('additional only render on correct error message condition', async () => {
    const wrapper = shallowMount(BaseSelect);

    expect(wrapper.find('.additional').exists()).toBeFalsy();
    await wrapper.setProps({
      errorMessage: 'This is an error',
    });
    expect(wrapper.find('.additional').exists()).toBeTruthy();
  });

  it('additional only render on correct slot condition', async () => {
    const wrapper = shallowMount(BaseSelect, {
      slots: {
        items: '<option>Demo</option>',
      },
    });

    expect(wrapper.find('option').exists()).toBeTruthy();
  });

  it('check class was removed by attrs ', async () => {
    const wrapper = shallowMount(BaseSelect, {
      attrs: {
        class: 'foo',
        'data-temp': 'bar',
      },
    });
    expect(wrapper.element).toHaveClass('foo');
    expect(wrapper.find('select').element).not.toHaveClass('foo');
    expect(wrapper.find('select').element).toHaveAttribute('data-temp');
  });

  it('sets not empty and autofilled classes ', async () => {
    const wrapper = shallowMount(BaseSelect);
    await wrapper.setProps({
      modelValue: 'Some value',
      items: [
        'some value',
        'another value',
      ],
    });
    expect(wrapper.find('select').element).toHaveClass('field__input--not-empty');
  });

  it('has correct modifier classes', () => {
    const wrapper = shallowMount(BaseSelect, {
      props: { modifier: 'disabled' },
    });
    const el = wrapper.find('label').element;
    expect(el).toHaveClass('field--disabled');
  });

  it('updates model', () => {
    const wrapper = shallowMount(BaseSelect);
    const input = wrapper.find('select');
    input.setValue('Frank');
    expect(wrapper.emitted()).toBeTruthy();
  });

  it('set focus class', async () => {
    const wrapper = shallowMount(BaseSelect);
    const label = wrapper.find('label').element;
    expect(label).not.toHaveClass('field--fake-focus field');
    const input = wrapper.find('select');
    await input.trigger('focus');
    expect(label).toHaveClass('field--fake-focus field');

    await input.trigger('blur');
    expect(label).not.toHaveClass('field--fake-focus field');
    expect(label).toHaveClass('field');
  });
});
