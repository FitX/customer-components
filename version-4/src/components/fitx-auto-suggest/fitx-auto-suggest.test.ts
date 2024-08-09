import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxAutoSuggest } from './index';

describe.skip('FitxInput', () => {
  it('renders without errors', () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test Label',
        id: 'test-id',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the label correctly', () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test Label',
        id: 'test-id',
      },
    });
    const label = wrapper.find('.input__label');
    expect(label.text()).toBe('Test Label');
  });

  it('renders slots correctly', () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test',
        id: 'test-id',
      },
      slots: {
        'icon-start': '<span class="icon-start">Icon Start</span>',
        'icon-end': '<span class="icon-end">Icon End</span>',
      },
    });
    expect(wrapper.find('.icon-start').exists()).toBe(true);
    expect(wrapper.find('.icon-end').exists()).toBe(true);
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test',
        id: 'test-id',
        modelValue: 'Initial Value',
      },
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('Initial Value');

    await input.setValue('New Value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value']);
  });

  it('applies disabled attribute correctly', () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test',
        id: 'test-id',
        disabled: true,
      },
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('displays error message when provided', () => {
    const wrapper = mount(FitxAutoSuggest, {
      props: {
        label: 'Test',
        id: 'test-id',
        errorMessage: 'Test Error',
      },
    });
    const errorMessage = wrapper.findComponent({ name: 'FitxErrorMessage' });
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Test Error');
  });
});
