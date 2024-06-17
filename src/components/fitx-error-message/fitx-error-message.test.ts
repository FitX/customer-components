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

  it('renders error message without icon', () => {
    const wrapper = mount(FitxErrorMessage, {
      props: {
        showIcon: false,
      }
    });
    expect(wrapper.html()).toContain('error-message--no-icon');
  });

  it('renders supporting text error message with icon', () => {
    const wrapper = mount(FitxErrorMessage, {
      props: {
        text: 'Oh - just a text',
        modifier: 'supportingText',
      },
    });
    expect(wrapper.html()).toContain('error-message--support');
  });

  it('renders supporting text error message without icon', () => {
    const wrapper = mount(FitxErrorMessage, {
      props: {
        text: 'Oh - just a text and no icon',
        modifier: 'supportingText',
        showIcon: false,
      },
    });
    expect(wrapper.html()).toContain('error-message--support');
    expect(wrapper.text()).toContain('Oh - just a text and no icon');
    expect(wrapper.html()).toContain('error-message--no-icon');
  });
});
