import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxLabel } from './index';

describe('FitxInput', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxLabel, {
      props: {
        text: 'Hello Label',
      },
    });
    expect(wrapper.text()).toContain('Hello Label');
  });

  it('respects disabled modifier', () => {
    const wrapper = mount(FitxLabel, {
      props: {
        text: 'Hello disabled Label',
        modifier: 'disabled',
      },
    });
    expect(wrapper.html()).toContain('label--disabled');
  });

  it('respects error state', () => {
    const wrapper = mount(FitxLabel, {
      props: {
        text: 'Hello disabled Label',
        error: true,
      },
    });
    expect(wrapper.html()).toContain('label--has-error');
  });

  it('respects for props', () => {
    const wrapper = mount(FitxLabel, {
      props: {
        text: 'Hello disabled Label',
        for: 'abc',
      },
    });

    const wrapper2 = mount(FitxLabel, {
      props: {
        text: 'Hello disabled Label',
      },
    });
    !expect(wrapper2.element.attributes['for']).toBeDefined();
  });
});
