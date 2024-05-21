import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import FitxButton from './fitx-another-button.vue';

describe('FitxButton', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxButton, {
      props: {
        msg: 'Hello FitX',
        book: {
          title: 'Hallo Title',
          year: 2024,
          author: 'Micha'
        }
      }
    });
    expect(wrapper.text()).not.toContain('Hello FitX');
  });
});
