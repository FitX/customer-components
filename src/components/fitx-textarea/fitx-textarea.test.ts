import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { FitxTextarea } from './index';

describe('FitxTextarea', () => {
  it('renders the correct initial value', () => {
    const wrapper = mount(FitxTextarea, {
      props: {
        label: 'Test',
      },
    });
    const textarea = wrapper.find('textarea');
    expect((textarea.element as HTMLTextAreaElement).value).toBe('');
  });

  it('renders the correct maxLength', () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', maxLength: 10 },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toBe('10');
  });

  it('displays error message when exceeding maxLength', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', maxLength: 10, modelValue: 'Exceeding max length value' },
    });
    await nextTick();
    const errorMessage = wrapper.findComponent({ name: 'FitxErrorMessage' });
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Die maximale Anzahl an Zeichen ist erreicht.');
  });

  it('does not display error message when under maxLength', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', maxLength: 50, modelValue: 'Valid value' },
    });
    await nextTick();
    const errorMessage = wrapper.findComponent({ name: 'FitxErrorMessage' });
    expect(errorMessage.exists()).toBe(false);
  });

  it('renders count slot correctly', async () => {
    const wrapper = mount(FitxTextarea, {
      props: {label: 'Test', modelValue: 'Test val', maxLength: 50 },
      slots: {
        count: '<div class="count-slot">{{ currentLength }} characters</div>',
      },
    });
    await nextTick();
    await wrapper.setProps({ modelValue: 'Test Value' });
    const countSlot = wrapper.find('.count-slot');
    expect(countSlot.exists()).toBe(true);
    expect(countSlot.text()).toContain('10 characters');
  });

  it('is disabled when props.disabled is true', () => {
    const wrapper = mount(FitxTextarea, {
      props: {
        label: 'Test',
        disabled: true },
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
      props: {label: 'Test', id: customId },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('id')).toBe(customId);
  });

  /**
   * Functions
   */

  it('computed errorMessage returns error message when maxLength is exceeded', async () => {
    const wrapper = mount(FitxTextarea, {
      props: {
        label: 'Test',
        modelValue: 'Exceeding max length',
        maxLength: 10,
        errorMessageMaxLength: 'too much',
      },
    });
    expect(wrapper.vm.errorMessage).toBe('too much');
    expect(wrapper.html())
    await wrapper.setProps({ modelValue: '' })
    await nextTick();
    expect(wrapper.vm.errorMessage).toBe(undefined);

  });

  it('computed errorMessage returns provided error message', async () => {
    const wrapper = mount(FitxTextarea, {
      props: {
        label: 'Test',
        modelValue: 'Valid',
        maxLength: 50,
        errorMessage: 'Ein Fehler ist aufgetreten.',
      },
    });
    await nextTick();
    const errorMessage = wrapper.vm.errorMessage;
    expect(errorMessage).toBe('Ein Fehler ist aufgetreten.');
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

  it('v-model works correctly', async () => {
    const wrapper = mount(FitxTextarea, {
      props: { label: 'Test', modelValue: 'Initial value' }
    });

    // const textarea = wrapper.find('textarea');
    await wrapper.setValue('Updated value')
    await nextTick();
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['Updated value']);
  });

  it('binds and updates modelValue correctly', async () => {
    const wrapper = mount(FitxTextarea, {
      props: {
        label: 'TEst',
        id: 'test-id',
        modelValue: 'Initial Value',
      },
    });

    const textarea = wrapper.find('textarea');
    expect((textarea.element).value).toBe('Initial Value');

    await textarea.setValue('New Value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value']);
    await nextTick();
    await wrapper.setProps({ modelValue: 'Updated Value' });
    expect((textarea.element).value).toBe('Updated Value');
  });
});

