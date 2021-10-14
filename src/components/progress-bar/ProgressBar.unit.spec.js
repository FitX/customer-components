import { shallowMount, mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseBanner from '@/components/base-banner/BaseBanner.vue';

describe('Base Banner', () => {
  it('has no icon option via modifier', async () => {
    const wrapper = shallowMount(BaseBanner);
    const div = wrapper.find('.base-banner');
    expect(div.element).toHaveClass('base-banner');
    await wrapper.setProps({ modifier: 'no-icon' });
    expect(div.element).toHaveClass('base-banner--no-icon base-banner');
  });

  it('renders optional html content', async () => {
    const wrapper = shallowMount(BaseBanner, {
      slots: {
        default: '<p>foo bar</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>foo bar</p>');
  });
});
