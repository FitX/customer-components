import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxLabel } from './index';

describe('FitxLabel', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxLabel);
    expect(wrapper.exists()).toBeTruthy();
  });
});
