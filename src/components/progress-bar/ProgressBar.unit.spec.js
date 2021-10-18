import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import ProgressBar from '@/components/progress-bar/ProgressBar.vue';

describe('Base Banner', () => {
  it('renders with default values', () => {
    const wrapper = shallowMount(ProgressBar);
    const emptyList = wrapper.find('.progress');
    expect(emptyList.element).toHaveStyle('--progress-current-step-index: 1; --progress-steps-length: 0;')
  });

  it('has dynamic steps option', async () => {
    const wrapper = shallowMount(ProgressBar);
    const steps = wrapper.find('.progress');
    expect(steps.element).toHaveStyle('--progress-current-step-index: 1; --progress-steps-length: 0;')
    await wrapper.setProps({ steps: ['eins', 'zwei', 'drei', 'vier'] });
    expect(steps.element).toHaveStyle(' --progress-steps-length: 4;');
    const list = wrapper.find('ol').element;
    expect(list.children).toHaveLength(4);
  });

  it('has option to set active current step', async () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        steps: ['eins', 'zwei', 'drei', 'vier'],
        currentStepIndex: 2,
      },
    });

    const steps = wrapper.find('.progress');
    expect(steps.element).toHaveStyle('--progress-steps-length: 4;');
    expect(steps.element).toHaveStyle('--progress-current-step-index: 2;');
    const list = wrapper.find('ol').element.children;
    expect(list[0]).toHaveClass('progress__item progress__item--done');
    expect(list[1]).toHaveClass('progress__item progress__item--done');
    expect(list[2]).not.toHaveClass('progress__item progress__item--done');
    expect(list[2]).toHaveClass('progress__item progress__item--active');
    expect(list[3]).toHaveClass('progress__item');

    await wrapper.setProps({ currentStepIndex: 3 });
    expect(steps.element).toHaveStyle('--progress-current-step-index: 3;');
    expect(list[0]).toHaveClass('progress__item progress__item--done');
    expect(list[1]).toHaveClass('progress__item progress__item--done');
    expect(list[2]).toHaveClass('progress__item progress__item--done');
    expect(list[3]).toHaveClass('progress__item progress__item--active');
  });

  it('has dark mode option', async () => {
    const wrapper = shallowMount(ProgressBar);
    const div = wrapper.find('.progress');
    expect(div.element).not.toHaveClass('progress--dark');
    await wrapper.setProps({ isDarkMode: true });
    expect(div.element).toHaveClass('progress--dark');
  });

  it('sets steps names to a given length'
    , async () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        steps: ['eins', 'zwei', 'drei', 'vier'],
      },
    });
    const step = wrapper.find('ol li span').element;
    expect(step).toContainHTML('eins<br />');
    await wrapper.setProps({ characterLimit: 2 });
    expect(step).toContainHTML('ei<br />ns<br />');
  });

  it('emits value when step is selected', async () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        steps: ['eins', 'zwei', 'drei', 'vier'],
      },
    });
    await wrapper.find('li:nth-child(3)').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('step-selected');
    expect(wrapper.emitted('step-selected')[0]).toEqual([2]);
  });
});
