
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxAutoSuggest } from './index';
import { nextTick } from 'vue';


const options = new Array(50).fill('').map((_, index) => ({
  text: `Option ${index}`,
  value: `Option ${index}`,
}));

const defaultProps = { options, label: 'Test', name: 'test'}

describe('FitxAutoSuggest', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxAutoSuggest, { props: defaultProps});
    expect(wrapper.exists()).toBeTruthy();
  });

  it('isFilled is false when inputValue is empty', async () => {
    const wrapper = mount(FitxAutoSuggest, { props: defaultProps});
    const componentRef = wrapper.vm.$refs.component;

    componentRef.inputValue = '';
    await nextTick();
    expect(wrapper.vm.isFilled).toBe(false);
  });

  it.only('isFilled is true when inputValue is present', async () => {
    const wrapper = mount(FitxAutoSuggest, { props: defaultProps});
    const componentRef = wrapper.vm.$refs.component;
    componentRef.inputValue = 'Test';
    expect(wrapper.vm.isFilled).toBe(true);
  });
});
