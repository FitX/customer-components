import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxSwitch } from './index';

describe('Switch', () => {
  it('renders the component with default props', () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Test Label',
        modelValue: false,
      },
    });
    expect(wrapper.find('.switch__label').text()).toContain('Test Label');
    expect(wrapper.find('.switch__text-on').text()).toBe('An');
    expect(wrapper.find('.switch__text-off').text()).toBe('Aus');
  });

  it('renders with custom props', () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Custom Label',
        textOn: 'On',
        textOff: 'Off',
        modelValue: false,
      },
    });
    expect(wrapper.find('.switch__label').text()).toContain('Custom Label');
    expect(wrapper.find('.switch__text-on').text()).toBe('On');
    expect(wrapper.find('.switch__text-off').text()).toBe('Off');
  });

  it('display disabled modifier correctly', async () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Test Label',
        modifier: 'disabled',
        modelValue: false,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('aria-disabled')).toBeDefined();
  });

  it('computes isDisabled correctly', async () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Test Label',
        disabled: true,
        modelValue: false,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('updates modelValue when input is clicked', async () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Test Label',
        modelValue: false,
      },
    });
    const input = wrapper.find('input');
    await input.setValue(true);
    expect(input.element.checked).toBe(true);
  });

  it('applies the correct classes based on props and state', async () => {
    const wrapper = mount(FitxSwitch, {
      props: {
        label: 'Test Label',
        fakeModifier: 'hover',
        modelValue: true,
      },
    });
    const label = wrapper.find('label');
    expect(label.classes()).toContain('switch--is-active');
    expect(label.classes()).toContain('switch--fake-hover');
  });
});
