
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { FitxTextField } from './index';

describe('FitxTextField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxTextField);
    expect(wrapper.exists()).toBeTruthy();
  });

    it('renders the component', () => {
      const wrapper = mount(FitxTextField, {
        props: {
          modelValue: '',
          isValid: false,
          errorMessage: null,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.text-field').exists()).toBe(true);
    });

    it('applies "is-filled" class when input is not empty', async () => {
      const wrapper = mount(FitxTextField, {
        props: {
          modelValue: '',
        },
      });

      // By default, modelValue is empty, so "is-filled" should not be present
      expect(wrapper.classes()).not.toContain('is-filled');

      // Set a non-empty modelValue and check if the class is applied
      await wrapper.setProps({ modelValue: '123' });
      expect(wrapper.classes()).toContain('text-field--is-filled');
    });

    it('adds "is-valid" class when the isValid prop is true', async () => {
      const wrapper = mount(FitxTextField, {
        props: {
          isValid: false,
        },
      });

      // Initially, isValid is false, so "is-valid" class should not be present
      expect(wrapper.classes()).not.toContain('is-valid');

      // Set isValid to true and check if the class is applied
      await wrapper.setProps({ isValid: true });
      expect(wrapper.classes()).toContain('text-field--is-valid');
    });

    it('shows error message when errorMessage is passed', async () => {
      const wrapper = mount(FitxTextField, {
        props: {
          errorMessage: null,
        },
      });

      // By default, errorMessage is null, so it should not be rendered
      expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).exists()).toBe(false);

      // Set errorMessage and check if the error message is rendered
      await wrapper.setProps({ errorMessage: 'This is an error' });
      expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'FitxErrorMessage' }).text()).toBe('This is an error');
    });

    /* it('focuses input when the text field is clicked', async () => {
      const focusMock = vi.fn();
      const wrapper = mount(FitxTextField, {
        props: {
          modelValue: '',
        },
        attachTo: document.body, // To simulate DOM behavior properly
      });

      const input = wrapper.find('input');
      input.element.focus = focusMock; // Mock focus method

      // Trigger the click event
      await wrapper.trigger('click');

      expect(focusMock).toHaveBeenCalled();
    }); */
  it('focuses input when the text field is clicked', async () => {
    const wrapper = mount(FitxTextField, {
      props: {
        modelValue: '',
      },
      attachTo: document.body, // Attach to document for DOM-related events
    });

    // Simulate the structure where the input is inside an element with class 'input'
    const inputContainer = wrapper.find('.input');
    const inputElement = wrapper.find('input');

    // Mock the focus method on the input element
    const focusMock = vi.spyOn(inputElement.element, 'focus');

    // Trigger click on the input container
    await inputContainer.trigger('click');

    // Check that the input's focus method was called
    expect(focusMock).toHaveBeenCalled();
  });

  it('renders the IconCheckmark when isValid is true', async () => {
      const wrapper = mount(FitxTextField, {
        props: {
          isValid: true,
        },
      });

      const iconCheckmark = wrapper.findComponent('.icon-valid');
      expect(iconCheckmark.exists()).toBe(true);
      expect(iconCheckmark.classes()).toContain('icon-valid');
    });


  it('renders slots properly', () => {
      const wrapper = mount(FitxTextField, {
        props: {
          modelValue: '',
          isValid: true,
          errorMessage: 'An error occurred',
        },
        slots: {
          'input-end': '<div class="slot-input-end">Custom End Slot</div>',
        },
      });

      // Check if custom slot content is rendered
      expect(wrapper.find('.slot-input-end').exists()).toBe(true);
    });
});
