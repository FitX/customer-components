import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxErrorMessage } from '@/index';

describe('Error Message', () => {
  it('is defined', () => {
    expect(FitxErrorMessage).toBeDefined();
  });

  it('renders error message with text prop', () => {
    const wrapper = mount(FitxErrorMessage, {
      props: {
        text: 'ups',
      },
    });
    expect(wrapper.html()).toContain('ups');
  });
});
