t('@TODO enable after babel src', () => {
  expect(true).toBe(true);
});
/* 
@TODO enable after babel src
import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import DateInput from '@/components/date-input/DateInput.vue';

describe('Date Input', () => {
  it('renders date input', () => {
    const wrapper = mount(DateInput, {
      props: {
        model: '1984-08.11',
        isValid: true,
      },
    });
    const date = wrapper.find('input');
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
    expect(wrapper.vm.value).toBe(null);
    // const input = wrapper.find('input');
    await wrapper.setProps({ modelValue: '2013-03-10' });
    expect(wrapper.vm.value).toBe('10.03.2013');
  });
}); */
