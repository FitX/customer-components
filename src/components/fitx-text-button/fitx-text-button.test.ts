import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { FitxTextButton } from './index';

describe('FitxTextButton', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxTextButton, { slots: { default: 'Hello FitX' } });
    expect(wrapper.text()).toContain('Hello FitX');
  });
  it('modifier works', async () => {
    const wrapper = mount(FitxTextButton, { props: { modifier: 'primary' } });
    expect(wrapper.html()).toContain('text-button--primary');
    expect(wrapper.html()).not.toContain('text-button--secondary');
    wrapper.setProps({ modifier: ['secondary', 'disabled'] });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('text-button--secondary');
    expect(wrapper.html()).toContain('text-button--disabled');
    expect(wrapper.html()).not.toContain('text-button--primary');
  });

  it('fake modifier hover works', async () => {
    const wrapper = mount(FitxTextButton, { props: { fakeModifier: 'hover' } });
    expect(wrapper.html()).toContain('text-button--fake-hover');
    wrapper.setProps({ fakeModifier: undefined });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('text-button--fake-hover');
  });

  it('icons detected', async () => {
    const wrapper = mount(FitxTextButton, { slots: { 'icon-start': 'jo' } });
    expect(wrapper.html()).toContain('text-button--has-icon');
    expect(wrapper.html()).toContain('jo');
  });
});
