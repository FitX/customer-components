import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FitxBadge from '@/components/fitx-badge/FitxBadge.vue';

describe('Badge', () => {
  it('renders default Badge state', () => {
    const wrapper = shallowMount(FitxBadge, {
      props: {
        value: 'Foobar',
        status: 3,
      },
    });
    expect(wrapper.find('.badge').text()).toContain('Foobar');
    expect(wrapper.find('.badge').classes()).toContain('badge--status-3');
  });
});
