import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { FitxTextarea } from './index';
import { FitxErrorMessage } from '@/components/fitx-error-message';

describe('FitxTextarea', () => {
  it('renders initial modelValue correctly and updates via v-model', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', modelValue: 'Initial Value' }
    });

    const textarea = wrapper.find('textarea');
    expect((textarea.element as HTMLTextAreaElement).value).toBe('Initial Value');

    await textarea.setValue('New Value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value']);

    await wrapper.setProps({ modelValue: 'Updated Value' });
    expect((textarea.element as HTMLTextAreaElement).value).toBe('Updated Value');
  });

  it('renders the correct maxLength', () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', maxLength: 10 },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toBe('10');
  });

  it('handles errorMessage and maxLength correctly', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', maxLength: 10, modelValue: 'Exceeding max length value', errorMessageMaxLength: 'too much' },
    });

    let errorMessage = wrapper.findComponent(FitxErrorMessage);
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('too much');

    await wrapper.setProps({ modelValue: 'Valid' });
    await nextTick();
    errorMessage = wrapper.findComponent(FitxErrorMessage);
    expect(errorMessage.exists()).toBe(false);
  });

  it('renders count slot correctly', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', modelValue: 'Test val', maxLength: 50 },
      slots: { count: '<div class="count-slot">{{ currentLength }} characters</div>' },
    });
    await wrapper.setProps({ modelValue: 'Test Value' });
    const countSlot = wrapper.find('.count-slot');
    expect(countSlot.exists()).toBe(true);
    expect(countSlot.text()).toContain('10 characters');
  });

  it('is disabled when props.disabled is true', () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', disabled: true },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('disabled')).toBe('');
  });

  it('generates a random id if not provided', () => {
    const wrapper = mount(FitxTextarea, { props: { label: 'Test' }});
    const textarea = wrapper.find('textarea');
    const generatedId = textarea.attributes('id');

    // Check Pattern
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidPattern.test(generatedId!)).toBe(true);
  });

  it('uses the provided id if available', () => {
    const customId = 'custom-id';
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', id: customId },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('id')).toBe(customId);
  });

  it('useInput returns correct wrapperEl, isDisabled, and componentClasses', () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', disabled: true }
    });

    const { wrapperEl, isDisabled, componentClasses } = wrapper.vm;

    expect(wrapperEl).toBeInstanceOf(Object);
    expect(isDisabled).toBe(true);
    expect(componentClasses).toContain('textarea');
  });
});
