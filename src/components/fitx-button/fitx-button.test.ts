
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxButton } from './index';

describe('FitxButton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxButton);
    expect(wrapper.exists()).toBeTruthy();
  });
});
