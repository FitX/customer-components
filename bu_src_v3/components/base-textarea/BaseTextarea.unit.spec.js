import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseTextarea from '@/components/base-textarea/BaseTextarea.vue';

describe('Base Text Area', () => {
  it('renders textarea', () => {
    const wrapper = mount(BaseTextarea);
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('type')).toBe('textarea');
  });

  it('emits correct value on input', async () => {
    const wrapper = mount(BaseTextarea);
    const textarea = wrapper.find('textarea');
    await textarea.setValue('This is a test');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });

  it('calculates current length', async () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        maxlength: 150,
      },
    });
    expect(wrapper.vm.currentLength).toBe(0);
    await wrapper.setProps({
      modelValue: 'This is just a test',
    });
    expect(wrapper.vm.currentLength).toBe(19);
  });

  it('warns when max length is reached', async () => {
    const wrapper = mount(BaseTextarea, {
      attrs: {
        maxLength: 5,
      },
      props: {
        modelValue: '',
      },
    });
    expect(wrapper.vm.currentLength).toBe(0);
    await wrapper.setProps({ modelValue: 'Hey ho lets go' });
    expect(wrapper.vm.currentLength).toBe(14);
    expect(wrapper.vm.errorMessage).toBe('Die maximale Anzahl an Zeichen ist erreicht.');
  });
});
