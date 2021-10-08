import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseRadio from '@/components/base-radio/BaseRadio.vue';

describe('Base Radio', () => {
  it('renders default base radio', () => {
    const wrapper = shallowMount(BaseRadio, {
      props: {
        label: 'Foobar',
        value: 'selected',
      },
    });
    expect(wrapper.find('.radio__text').text()).toContain('Foobar');
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('radio');
  });

  it('updates computed value and emits update', async () => {
    const wrapper = shallowMount(BaseRadio);
    const input = wrapper.find('input');
    await input.setValue('some value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('has all necessary states', async () => {
    const wrapper = shallowMount(BaseRadio);
    const label = wrapper.find('label');
    expect(label.element).toHaveClass('radio');
    expect(label.element).not.toHaveClass('radio--disabled');
    await wrapper.setProps({ modifier: 'disabled' });
    expect(label.element).toHaveClass('radio--disabled');
    await wrapper.setProps({ modifier: 'fake-focus' });
    expect(label.element).toHaveClass('radio--fake-focus');
    await wrapper.setProps({ modifier: 'fake-hover' });
    expect(label.element).toHaveClass('radio--fake-hover');
    await wrapper.setProps({ modifier: 'error' });
    expect(label.element).toHaveClass('radio--error');
  });
});
