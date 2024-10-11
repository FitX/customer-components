
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { GymxToast } from '@fitx/gymx-ui';
import { IconError, IconCheckmark } from '@/components';
import { FitxToast } from './index';


describe('FitxToast', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxToast);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the IconCheckmark when type is success', () => {
    const wrapper = mount(FitxToast, {
      props: {
        type: 'success',
      },
    });

    const gymxToast = wrapper.findComponent(GymxToast);
    expect(gymxToast.props('icon')).toBe(IconCheckmark);
  });

  it('renders the IconError when type is not success', () => {
    const wrapper = mount(FitxToast, {
      props: {
        type: 'error',
      },
    });

    const gymxToast = wrapper.findComponent(GymxToast);
    expect(gymxToast.props('icon')).toBe(IconError);
  });
});
