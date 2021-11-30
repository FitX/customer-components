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
    expect(date.attributes('data-mask')).toBe("[\"#T.MM.JJJJ\",\"##.MM.JJJJ\",\"##.#M.JJJJ\",\"##.##.JJJJ\",\"##.##.#JJJ\",\"##.##.##JJ\",\"##.##.###J\",\"##.##.####\"]");
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
    // const input = wrapper.find('input');
    await wrapper.setProps({ modelValue: '2013-03-10' });
    expect(wrapper.vm.dottedDate).toBe('10.03.2013');
  });
});
