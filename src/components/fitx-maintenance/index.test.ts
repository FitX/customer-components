import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxMaintenance } from './index';

describe('MaintenanceComponent', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(FitxMaintenance);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('maintenance');
  });

  it('applies the correct theme class when the theme prop is provided', () => {
    const wrapper = mount(FitxMaintenance, {
      props: {
        theme: 'dark',
      },
    });
    expect(wrapper.attributes('data-theme')).toBe('dark');
  });

  it('renders slots correctly', () => {
    const wrapper = mount(FitxMaintenance, {
      slots: {
        title: '<div class="custom-title">Maintenance Mode</div>',
        copy: '<div class="custom-copy">We will be back soon!</div>',
        'after-copy': '<div class="custom-after-copy">Thank you for your patience.</div>',
      },
    });

    expect(wrapper.find('.custom-title').exists()).toBe(true);
    expect(wrapper.find('.custom-title').text()).toBe('Maintenance Mode');
    expect(wrapper.find('.custom-copy').exists()).toBe(true);
    expect(wrapper.find('.custom-copy').text()).toBe('We will be back soon!');
    expect(wrapper.find('.custom-after-copy').exists()).toBe(true);
    expect(wrapper.find('.custom-after-copy').text()).toBe('Thank you for your patience.');
  });

  it('renders the brand-gorilla image', () => {
    const wrapper = mount(FitxMaintenance);
    expect(wrapper.find('.maintenance__image').exists()).toBe(true);
  });

  it('renders the SVG background', () => {
    const wrapper = mount(FitxMaintenance);
    expect(wrapper.find('.maintenance__bg').exists()).toBe(true);
  });
});
