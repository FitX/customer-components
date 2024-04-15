import { mount, shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import DoubleOption from '@/components/double-option/DoubleOption.vue';
import BaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';

describe('Double Option', () => {
  it('updates computed value and emits update', async () => {
    const wrapper = mount(DoubleOption, {
      props: {
        modelValue: 1,
        options: [{
          title: 'Option 1',
          value: 1,
        }, {
          title: 'Option 2',
          value: 2,
        }],
      },
    });
    // const child = wrapper.findComponent(BaseOptionForm).find('input');
    const child = wrapper.findAll('input');
    expect(child.length).toBe(2);
    await child[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('updates isChecked value', async () => {
    const wrapper = mount(DoubleOption, {
      props: {
        modelValue: 1,
        options: [{
          title: 'Option 1',
          value: 1,
        }, {
          title: 'Option 2',
          value: 2,
        }],
      },
    });
    const btns = wrapper.findAll('label');
    expect(btns[0].classes('btn--active')).toBe(true);
    expect(btns[1].classes('btn--active')).toBe(false);
  });

  it('has all necessary states', async () => {
    const wrapper = mount(DoubleOption, {
      props: {
        modelValue: 1,
        options: [{
          title: 'Option 1',
          value: 1,
        }, {
          title: 'Option 2',
          value: 2,
        }],
      },
    });
    const btns = wrapper.findAll('label');
    expect(btns[0].classes('btn--disabled')).toBe(false);
    expect(btns[1].classes('btn--disabled')).toBe(false);
    await wrapper.setProps({ modifier: 'disabled' });
    expect(btns[0].classes('btn--disabled')).toBe(true);
    expect(btns[1].classes('btn--disabled')).toBe(true);
  });
});
