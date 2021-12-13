import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import DateInput from '@/components/date-input/DateInput.vue';

describe('Date Input', () => {
  it('renders date input', () => {
    const wrapper = mount(DateInput, {
      props: {
        model: '11.08.1984',
        isValid: true,
      },
    });
    const date = wrapper.find('input');
    expect(date.attributes('model')).toBe('11.08.1984');
  });

  it('emit value on update', async () => {
    const wrapper = mount(DateInput);
    const input = wrapper.find('input');
    await input.setValue('This is a test');
    expect(wrapper.emitted()).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
