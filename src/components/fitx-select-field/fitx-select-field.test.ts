import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { FitxSelectField } from './index';

const options = [{ text: 1 }, { text: 2 }, { text: 3 }];

describe('FitxSelectField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxSelectField);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('applies "is-filled" class when input is not empty', async () => {
    const wrapper = mount(FitxSelectField, {
      props: {
        modelValue: undefined,
        options,
      },
    });

    // By default, modelValue is empty, so "is-filled" should not be present
    expect(wrapper.classes()).not.toContain('is-filled');

    // Set a non-empty modelValue and check if the class is applied
    await wrapper.setProps({ modelValue: options[1] });
    expect(wrapper.classes()).toContain('select-field--is-filled');
  });

  it('shows error message when errorMessage is passed', async () => {
    const wrapper = mount(FitxSelectField, {
      props: {
        errorMessage: null,
        options,
      },
    });

    // By default, errorMessage is null, so it should not be rendered
    expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).exists()).toBe(false);

    // Set errorMessage and check if the error message is rendered
    await wrapper.setProps({ errorMessage: 'This is an error' });
    expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).text()).toBe('This is an error');
  });

  it('modelValue should be updated', async () => {
    const wrapper = mount(FitxSelectField, {
      attachTo: document.body,
      props: {
        modelValue: undefined,
        options: [1, 2, 3],
      },
    });
    const select = wrapper.find('select');
    await select.setValue(2);
    const emitted = await wrapper.emitted('update:modelValue');
    expect(emitted[0][0]).toBe(2);
  });

  it('focuses input when the text field is clicked', async () => {
    const wrapper = mount(FitxSelectField, {
      props: {
        modelValue: undefined,
        options: [1, 2, 3],
      },
      attachTo: document.body, // Attach to document for DOM-related events
    });
    const inputContainer = wrapper.find('.select');
    const inputElement = wrapper.find('select');

    // Mock the focus method on the input element
    const focusMock = vi.spyOn(inputElement.element, 'focus');

    // Trigger click on the input container
    await inputContainer.trigger('click');

    // Check that the input's focus method was called
    expect(focusMock).toHaveBeenCalled();
  });
});
