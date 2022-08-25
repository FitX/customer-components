import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FilterChip from '@/components/filter-chip/FilterChip.vue';

describe('Filter Chip', () => {
  it('renders default filter chip state', () => {
    const wrapper = shallowMount(FilterChip, {
      props: {
        label: 'Foobar',
        count: 3,
      },
    });
    expect(wrapper.find('.chip__label').text()).toContain('Foobar');
    expect(wrapper.find('.chip__count').text()).toContain('3');
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('checkbox');
  });

  it('updates computed value and emits update', async () => {
    const wrapper = shallowMount(FilterChip);
    const input = wrapper.find('input');
    await input.setValue('some value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('has all necessary states', async () => {
    const wrapper = shallowMount(FilterChip);
    const label = wrapper.find('label');
    expect(label.element).toHaveClass('chip');
    expect(label.element).not.toHaveClass('chip--disabled');
    await wrapper.setProps({ modifier: 'disabled' });
    expect(label.element).toHaveClass('chip--disabled');
    await wrapper.setProps({ modifier: 'fake-focus' });
    expect(label.element).toHaveClass('chip--fake-focus');
    await wrapper.setProps({ modifier: 'fake-hover' });
    expect(label.element).toHaveClass('chip--fake-hover');
  });

  it('updates isChecked value', async () => {
    const wrapper = shallowMount(FilterChip, {
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

  it('single chip should be works', async () => {
    const wrapper = shallowMount(FilterChip, {
      props: {
        modelValue: 'one',
        value: 'one',
      },
    });
    expect(wrapper.vm.isChecked).toBe(true);
  });
});
