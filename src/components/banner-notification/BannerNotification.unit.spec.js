import { flushPromises, shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BannerNotification from '@/components/banner-notification/BannerNotification.vue';

describe('Notification Banner', () => {
  jest.useFakeTimers();
  it('renders optional html content', async () => {
    const wrapper = shallowMount(BannerNotification, {
      slots: {
        default: '<p>foo bar</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>foo bar</p>');
  });
  it('render correct modifier', async () => {
    const wrapper = shallowMount(BannerNotification);
    expect(wrapper.html()).toContain('notification');
    await wrapper.setProps({ modifier: 'error' });
    expect(wrapper.html()).toContain('notification--error');
    await wrapper.setProps({ modifier: 'success' });
    expect(wrapper.html()).toContain('notification--success');
  });
  it('dont emit on missing duration', async () => {
    const wrapper = shallowMount(BannerNotification, {});
    jest.runAllTimers();
    expect(wrapper.emitted('duration-ends')).toBeFalsy();
  });
  it('emits if duration is greater then 0', async () => {
    const wrapper = shallowMount(BannerNotification, {
      props: {
        duration: 100,
      },
    });
    jest.runAllTimers();
    expect(wrapper.emitted('duration-ends')).toBeTruthy();
  });
});
