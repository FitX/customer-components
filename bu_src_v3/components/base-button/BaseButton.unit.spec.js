import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import BaseButton from '@/components/base-button/BaseButton.vue';

describe('Base Button', () => {
  it('renders as button as default', () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.html()).toMatch(`<button class=\"btn\"><span></span>
  <!--v-if-->
</button>`
    );
  });

  it('renders as link', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { tag: 'a' },
    });
    expect(wrapper.html()).toMatch(`<a class=\"btn\"><span></span>
  <!--v-if-->
</a>`
    );
  });

  it('renders as button with active state', () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        isActive: true,
      },
    });
    expect(wrapper.html()).toMatch('<button class="btn--active btn"><span></span><span class="btn__loading"></span></button>');
  });

  it('shows text', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { text: 'hello world' },
    });
    expect(wrapper.text()).toContain('hello world');
  });

  it('has correct modifier classes', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { modifier: 'secondary' },
    });
    const button = wrapper.find('button');
    expect(button.element).toHaveClass('btn--secondary');
  });
});
