import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import DateInput from '@/components/date-input/DateInput.vue';

describe('DateInput', () => {
  it('renders date input', () => {
    const wrapper = mount(DateInput, {
      props: {
        model: '1984-08.11',
        isValid: true,
      },
    });
    const date = wrapper.find('input');
    expect(date.attributes('data-mask')).toBe('##.##.####');
    expect(date.attributes('model')).toBe('1984-08.11');
  });

  it('emit value on update', async () => {
    const wrapper = mount(DateInput);
    const input = wrapper.find('input');
    await input.setValue('This is a test');
    expect(wrapper.emitted()).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });

  it('transforms date to readable format', async () => {
    const wrapper = mount(DateInput, {
      props: {
        model: '1984-08.11',
        isValid: true,
      },
    });
    expect(wrapper.vm.dottedDate).toBe(null);
    const input = wrapper.find('input');
    await input.setValue('2013-03-10T02:00:00Z');
    expect(wrapper.vm.dottedDate).toBe('20.13.0310');
  });
});
