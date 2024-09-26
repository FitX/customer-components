
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxTextField } from './index';

describe('FitxTextField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxTextField);
    expect(wrapper.exists()).toBeTruthy();
  });
});
