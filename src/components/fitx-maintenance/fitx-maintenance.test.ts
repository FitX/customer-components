
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxMaintenance } from './index';

describe('FitxMaintenance', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxMaintenance);
    expect(wrapper.exists()).toBeTruthy();
  });
});
