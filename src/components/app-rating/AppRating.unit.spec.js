import { shallowMount, mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AppRating from '@/components/app-rating/AppRating.vue';

describe('Base Banner', () => {
  it('has no icon option via modifier', async () => {
    const wrapper = shallowMount(BaseBanner);
    const div = wrapper.find('.base-banner');
    expect(div.element).toHaveClass('base-banner');
    await wrapper.setProps({ modifier: 'no-icon' });
    expect(div.element).toHaveClass('base-banner--no-icon base-banner');
  });

  it('renders optional html content', async () => {
    const wrapper = shallowMount(AppRating, {
      slots: {
        default: '<p>foo bar</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>foo bar</p>');
  });
});
