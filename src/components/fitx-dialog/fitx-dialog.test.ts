
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxDialog } from './index';

describe('FitxDialog', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxDialog);
    expect(wrapper.exists()).toBeTruthy();
  });
});
