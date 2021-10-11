import { shallowMount, mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import InfoBox from '@/components/info-box/InfoBox.vue';

describe('Info Box', () => {
  test('renders default',() => {
    const wrapper = shallowMount(InfoBox, {
      props: {
        content: 'Hello world',
      },
    });
    const content = wrapper.find('.info-box__content');
    expect(content.text()).toContain('Hello world');
    expect(wrapper.html()).toContain('<icon-info></icon-info>');
  });

  it('has no icon option via modifier', async () => {
    const wrapper = shallowMount(InfoBox);
    const div = wrapper.find('.info-box');
    expect(div.element).toHaveClass('info-box');
    await wrapper.setProps({ modifier: 'no-icon' });
    expect(div.element).toHaveClass('info-box--no-icon info-box');
  });

  it('renders optional html content', async () => {
    const wrapper = shallowMount(InfoBox, {
      slots: {
        default: '<p>foo bar</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>foo bar</p>');
  });
});
