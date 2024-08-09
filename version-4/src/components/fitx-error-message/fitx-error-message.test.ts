import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxErrorMessage } from './index';

describe('FitxErrorMessage', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxErrorMessage, {
      props: {
        text: 'Hello world! We are doomed. DOOMED!',
      },
    });
    expect(wrapper.text()).toContain('Hello world! We are doomed. DOOMED!');
  });

  it('renders error message with icon', () => {
    const wrapper = mount(FitxErrorMessage);
    expect(wrapper.html()).toContain('error-message__icon');
  });
});
