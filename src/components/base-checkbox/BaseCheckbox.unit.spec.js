import { shallowMount, mount } from '@vue/test-utils';
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

  /*
  it('updates isChecked value', async () => {
    const wrapper = shallowMount(BaseCheckbox, {
      props: {
        // value: 'selected-disabled',
        // modifier: 'disabled',
      },
    });
    await wrapper.setProps({ value: ['selected']});
    await wrapper.setProps({ computedValue: true });
    console.log('modelValue', wrapper.vm.modelValue);
    console.log(wrapper.html());
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });
   */
});
