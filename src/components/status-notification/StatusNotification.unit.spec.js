import { flushPromises, shallowMount, mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import StatusNotification from '@/components/status-notification/StatusNotification.vue';
// import * as vueUse from '@vueuse/core';

// For mocking navigator and changing online status
let navigator = window.navigator;

describe('Status Notification', () => {
  jest.useFakeTimers();
  it('emit is-online on mount', async () => {
    const wrapper = shallowMount(StatusNotification, {});
    jest.runAllTimers();
    expect(wrapper.emitted('is-online')).toBeTruthy();
  });
  it('dont emit is-online on mount if initial prop is false', async () => {
    const wrapper = shallowMount(StatusNotification, {
      props: {
        initialDetection: false,
      },
    });
    jest.runAllTimers();
    expect(wrapper.emitted('is-online')).toBeFalsy();
  });
  it('render default is online state', async () => {
    const wrapper = shallowMount(StatusNotification, {});
    jest.runAllTimers();
    expect(wrapper.html()).toContain('<icon-online>');
  });
  it('dont render default is online state', async () => {
    const wrapper = shallowMount(StatusNotification, {
      props: {
        showOnline: false,
      },
    });
    jest.runAllTimers();
    expect(wrapper.html()).toContain('status--hide-online');
  });
  it('offline emit works', async () => {
    // const spy = jest.spyOn(vueUse, 'useOnline').mockReturnValue(false);
    /* jest.mock('navigator', () => ({
      onLine: jest.fn(() => false)
    })); */
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    /* jest.mock('@vueuse/core', () => ({
      useOnline: jest.fn(() => false)
    })); */
    const wrapper = mount(StatusNotification, {
      props: {
        // offlineThrottle: 4000,
      },
    });
    console.log('w', wrapper.emitted());
    expect(wrapper.emitted('is-offline')).toBeTruthy();
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
    // navigator.onLine.mockRestore();
    /* jest.mock('@vueuse/core', () => ({
      useOnline: jest.fn().mockReturnValue(false),
    })); */
    // Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    // window.navigator.onLine = false;
    /* global.navigator = jest.fn().mockReturnValue({
      onLine: false,
    }); */
    // wrapper.vm.isOnline = false;
    /* Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    expect(wrapper.emitted('is-offline')).toBeFalsy();
    jest.runAllTimers();
    console.log('w', wrapper.vm.isOnline);
    expect(wrapper.emitted('is-offline')).toBeTruthy();*/
    //jest.runAllTimers();
    // expect(wrapper.emitted('is-online')).toBeTruthy();
  });
  it('offline render correctly', async () => {
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    const wrapper = mount(StatusNotification, {
      props: {
        // offlineThrottle: 4000,
      },
    });
    expect(wrapper.html()).toContain('<icon-offline>');
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
  });
  it('offline text render correctly', async () => {
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    const wrapper = mount(StatusNotification, {
      props: {
        offlineInfo: 'sorry',
      },
    });
    expect(wrapper.html()).toContain('sorry');
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
  });
  it('offline emit works with throttle', async () => {
    const wrapper = mount(StatusNotification, {
      props: {
        offlineThrottle: 2000,
      },
    });

    expect(wrapper.emitted('is-offline')).toBeFalsy();
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });
    jest.runAllTimers();
    setTimeout(() => {
      expect(wrapper.emitted('is-offline')).toBeTruthy();
      Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
    }, 2000);
  });
});
