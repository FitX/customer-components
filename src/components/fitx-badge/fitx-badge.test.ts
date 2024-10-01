
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxBadge } from './index';
// import { GymxBadge } from '@fitx/gymx-ui';

/* vi.mock('@fitx/gymx-ui', () => ({
  GymxBadge: {
    template: '<div><slot></slot></div>'
  }
})); */

describe('FitxBadge', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxBadge);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the default slot content', () => {
    const wrapper = mount(FitxBadge, {
      props: {
        text: 'Demo'
      }
    });

    expect(wrapper.text()).toContain('Demo');
  });

  it('renders round modifier on props round', () => {
    const wrapper = mount(FitxBadge, {
      props: {
        isRound: true,
      }
    });

    expect(wrapper.html()).toContain('badge--round');
  });

  it('renders the icon when props.icon is passed', () => {
    const TestIcon = { template: '<svg class="test-icon"></svg>' };

    const wrapper = mount(FitxBadge, {
      props: {
        text: 'Demo',
        icon: TestIcon
      }
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
  });

  it('does not render the icon when props.icon is not passed', () => {
    const wrapper = mount(FitxBadge, {
      props: {
        text: 'Demo'
      }
    });

    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('renders the custom slot content', () => {
    const wrapper = mount(FitxBadge, {
      props: {
        text: 'Demo'
      },
      slots: {
        default: '<div>Custom Slot Content</div>'
      }
    });

    expect(wrapper.html()).toContain('Custom Slot Content');
    expect(wrapper.text()).not.toContain('Demo');
  });
});
