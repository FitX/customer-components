
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxLink } from './index';

describe('FitxLink', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxLink);
    expect(wrapper.exists()).toBeTruthy();
  });
});
