import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';

describe('Base Button', () => {
  it('renders as button as default', () => {
    const wrapper = shallowMount(BaseOptionForm);
    expect(wrapper.html()).toMatch('<button class="btn"></button>');
  });

  it('shows title', () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        title: 'hello world',
      },
    });
    expect(wrapper.text()).toContain('hello world');
  });

  it('has correct modifier class', async () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: { modifier: 'disabled' },
    });
    const button = wrapper.find('button');
    expect(button.element).toHaveClass('btn--disabled');

    await wrapper.setProps({ modifier: ['disabled', 'error'] });
    expect(button.element).toHaveClass('btn--disabled');
    expect(button.element).toHaveClass('btn--error');

    await wrapper.setProps({ modifier: '' });
    expect(button.element).not.toHaveClass('btn--disabled');
    expect(button.element).toHaveClass('btn');

    await wrapper.setProps({ modifier: '' });
    expect(button.element).not.toHaveClass('btn--disabled');
    expect(button.element).toHaveClass('btn');
  });

  it('sets dark mode class', () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        isDarkMode: 'true',
      },
    });
    const button = wrapper.find('button');
    expect(button.element).toHaveClass('btn--dark');
  });

  it('emits correct value when is active', () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        isActive: 'true',
      },
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('unselected');
  });

  it('emits correct value when is not active', () => {
    const wrapper = shallowMount(BaseOptionForm);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('selected');
  });
});
