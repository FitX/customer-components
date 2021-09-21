import { mount, shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseTextarea from '@/components/base-textarea/BaseTextarea.vue';

describe('TextArea', () => {
  it('renders textarea', () => {
    expect(true).toBe(true);
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
});
