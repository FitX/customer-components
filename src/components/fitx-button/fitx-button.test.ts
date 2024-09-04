
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxButton } from './index';

describe('FitxButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxButton);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = mount(FitxButton, { slots: { default: 'Hello FitX' } });
    expect(wrapper.text()).toContain('Hello FitX');
  });
  it('modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { modifier: 'primary' } });
    expect(wrapper.html()).toContain('btn--primary');
    expect(wrapper.html()).not.toContain('btn--secondary');
    await wrapper.setProps({ modifier: 'secondary' });
    await wrapper.setProps({ state: 'disabled' });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('btn--secondary');
    expect(wrapper.html()).toContain('btn--disabled');
    expect(wrapper.html()).not.toContain('btn--primary');
  });

  it('sizes works', async () => {
    const wrapper = mount(FitxButton, { props: { size: 'small' } });
    expect(wrapper.html()).toContain('btn--small');
    await wrapper.setProps({ size: undefined });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('btn--small');
  });

  it('fake modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { state: 'hover' } });
    expect(wrapper.html()).toContain('btn--hover');
    await wrapper.setProps({ state: undefined });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('btn--hover');
  });

  it('fake modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { isIdle: true } });
    expect(wrapper.html()).toContain('btn--is-idle');
  });

  it('icons detected', async () => {
    const wrapper = mount(FitxButton, { slots: { 'icon-start': 'jo' } });
    expect(wrapper.html()).toContain('jo');
  });
});
