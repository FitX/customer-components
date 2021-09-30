import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseCheckbox from '@/components/base-checkbox/BaseCheckbox.vue';

describe('Base checbox', () => {
  it('renders basic checkbox', () => {
    const wrapper = shallowMount(BaseCheckbox, {
      props: {
        label: 'John Doe',
      },
    });
    const label = wrapper.find('.checkbox__text');
    expect(label.text()).toContain('John Doe');
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('checkbox');
  });

  it('has all necessary states', async () => {
    const wrapper = shallowMount(BaseCheckbox);
    const label = wrapper.find('label');
    expect(label.element).not.toHaveClass('checkbox--disabled');
    await wrapper.setProps({ modifier: 'disabled' });
    expect(label.element).toHaveClass('checkbox--disabled');
    await wrapper.setProps({ modifier: 'fake-focus' });
    expect(label.element).toHaveClass('checkbox--fake-focus');
    await wrapper.setProps({ modifier: 'fake-hover' });
    expect(label.element).toHaveClass('checkbox--fake-hover');
    await wrapper.setProps({ modifier: 'error' });
    expect(label.element).toHaveClass('checkbox--error');
  });

  it('updates will be emitted', async () => {
    const wrapper = shallowMount(BaseCheckbox);
    const input = wrapper.find('input');
    await input.setValue('some value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('updates isChecked value', async() => {
    const wrapper = shallowMount(BaseCheckbox, {
      props: {
        modelValue: [
          'one',
          'two',
        ],
        value: 'one',
      },
    });
    expect(wrapper.vm.isChecked).toBe(true);
  });
});
