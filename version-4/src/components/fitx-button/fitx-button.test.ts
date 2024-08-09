import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { FitxButton } from './index';

describe('FitxButton', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxButton, { slots: { default: 'Hello FitX' } });
    expect(wrapper.text()).toContain('Hello FitX');
  });
  it('modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { modifier: 'primary' } });
    expect(wrapper.html()).toContain('button--primary');
    expect(wrapper.html()).not.toContain('button--secondary');
    wrapper.setProps({ modifier: ['secondary', 'disabled'] });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('button--secondary');
    expect(wrapper.html()).toContain('button--disabled');
    expect(wrapper.html()).not.toContain('button--primary');
  });

  it('sizes works', async () => {
    const wrapper = mount(FitxButton, { props: { size: 'small' } });
    expect(wrapper.html()).toContain('button--size-small');
    wrapper.setProps({ size: undefined });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('button--size-small');
  });

  it('fake modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { fakeModifier: 'hover' } });
    expect(wrapper.html()).toContain('button--fake-hover');
    wrapper.setProps({ fakeModifier: undefined });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('button--fake-hover');
  });

  it('fake modifier works', async () => {
    const wrapper = mount(FitxButton, { props: { isActive: true } });
    expect(wrapper.html()).toContain('button--is-active');
  });

  it('icons detected', async () => {
    const wrapper = mount(FitxButton, { slots: { 'icon-start': 'jo' } });
    expect(wrapper.html()).toContain('button--has-icon');
    expect(wrapper.html()).toContain('jo');
  });
});
