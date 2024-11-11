
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxAutoSuggest } from './index';

describe('FitxAutoSuggest', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxAutoSuggest);
    expect(wrapper.exists()).toBeTruthy();
  });
});
