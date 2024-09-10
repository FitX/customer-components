
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxLink } from './index';

describe('FitxLink', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxLink);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = mount(FitxLink, { slots: { default: 'Hello FitX' } });
    expect(wrapper.text()).toContain('Hello FitX');
  });
  it('modifier works', async () => {
    const wrapper = mount(FitxLink, { props: { modifier: 'secondary' } });
    expect(wrapper.html()).toContain('link--secondary');
  });

  it('icons detected', async () => {
    const wrapper = mount(FitxLink, {
      slots: {
        'icon-start': 'lets',
        'icon-end': 'go',
      } });
    expect(wrapper.html()).toContain('lets');
    expect(wrapper.html()).toContain('go');
  });
});
