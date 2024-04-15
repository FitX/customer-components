import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FitxNotificationBadge from '@/components/fitx-notification-badge/FitxNotificationBadge.vue';

describe('Badge', () => {
  it('renders default Badge state', () => {
    const wrapper = shallowMount(FitxNotificationBadge, {
      props: {
        value: 99,
      },
    });
    expect(wrapper.find('.notification-badge').text()).toContain('99');
    expect(wrapper.find('.notification-badge').classes()).toContain('notification-badge--status-2');
  });
});
