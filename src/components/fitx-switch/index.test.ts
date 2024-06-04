import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxSwitch } from './index';

describe('Switch', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(FitxSwitch);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('switch');
  });
});
