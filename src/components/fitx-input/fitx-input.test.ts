import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxInput } from './index';

describe('FitxInput', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxInput, {
      props: {
        text: 'Hello world! We are doomed. DOOMED!',
      },
    });
    expect(wrapper.text()).toContain('Hello world! We are doomed. DOOMED!');
  });

  it('renders error message with icon', () => {
    const wrapper = mount(FitxInput);
    expect(wrapper.html()).toContain('error-message__icon');
  });
});
