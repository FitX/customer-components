import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BannerNotification from '@/components/banner-notification/BannerNotification.vue';

describe('Notification Banner', () => {
  it('renders optional html content', async () => {
    const wrapper = shallowMount(BannerNotification, {
      slots: {
        default: '<p>foo bar</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>foo bar</p>');
  });
});
