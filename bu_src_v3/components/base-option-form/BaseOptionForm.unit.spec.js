import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';

describe('Option Form', () => {
  it('renders default filter chip state', () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        title: 'Foobar',
      },
    });
    expect(wrapper.find('label').text()).toContain('Foobar');
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('radio');
  });

  it('multiple select checkbox instead radio', () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        modelValue: [1],
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('checkbox');
  });

  it('updates computed value and emits update', async () => {
    const wrapper = shallowMount(BaseOptionForm);
    const input = wrapper.find('input');
    await input.setValue('some value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('has all necessary states', async () => {
    const wrapper = shallowMount(BaseOptionForm);
    const label = wrapper.find('label');
    expect(label.element).toHaveClass('btn');
    expect(label.element).not.toHaveClass('btn--disabled');
    await wrapper.setProps({ modifier: 'disabled' });
    expect(label.element).toHaveClass('btn--disabled');
    await wrapper.setProps({ modifier: 'fake-focus' });
    expect(label.element).toHaveClass('btn--fake-focus');
    await wrapper.setProps({ modifier: 'fake-hover' });
    expect(label.element).toHaveClass('btn--fake-hover');
  });

  it('updates isChecked value', async () => {
    const wrapper = shallowMount(BaseOptionForm, {
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

  it('updates isChecked value single', async () => {
    const wrapper = shallowMount(BaseOptionForm, {
      props: {
        modelValue: 'jojo',
        value: 'jojo',
      },
    });
    expect(wrapper.vm.isChecked).toBe(true);
  });
});
