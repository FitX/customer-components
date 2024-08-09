import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxBadge } from './index';

describe('FitxBadge', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxBadge, {
      props: {
        text: 'Hello Badge',
      },
    });
    expect(wrapper.text()).toContain('Hello Badge');
  });
});
