
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxSelectField } from './index';

describe('FitxSelectField', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxSelectField);
    expect(wrapper.exists()).toBeTruthy();
  });
});
