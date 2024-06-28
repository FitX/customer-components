import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { FitxInput } from './index';

describe('FitxInput', () => {
  it('renders without errors', () => {
    const wrapper = mount(FitxInput, {
      props: {
        label: 'Test Label',
        id: 'test-id',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the label correctly', () => {
    const wrapper = mount(FitxInput, {
      props: {
        label: 'Test Label',
        id: 'test-id',
      },
    });
    const label = wrapper.find('.input__label');
    expect(label.text()).toBe('Test Label');
  });

  it('renders slots correctly', () => {
    const wrapper = mount(FitxInput, {
      props: {
        id: 'test-id',
      },
      slots: {
        'icon-start': '<span class="icon-start">Icon Start</span>',
        'icon-end': '<span class="icon-end">Icon End</span>',
      },
    });
    expect(wrapper.find('.icon-start').exists()).toBe(true);
    expect(wrapper.find('.icon-end').exists()).toBe(true);
  });

  it('binds v-model correctly', async () => {
    const wrapper = mount(FitxInput, {
      props: {
        id: 'test-id',
        modelValue: 'Initial Value',
      },
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('Initial Value');

    await input.setValue('New Value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value']);
  });

  it('applies disabled attribute correctly', () => {
    const wrapper = mount(FitxInput, {
      props: {
        id: 'test-id',
        disabled: true,
      },
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('displays error message when provided', () => {
    const wrapper = mount(FitxInput, {
      props: {
        id: 'test-id',
        errorMessage: 'Test Error',
      },
    });
    const errorMessage = wrapper.findComponent({ name: 'FitxErrorMessage' });
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Test Error');
  });
});


describe.skip('FitxInput', () => {
 let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(FitxInput, {
      props: {
        label: 'Test Label',
        id: 'test-id',
        errorMessage: 'Test Error',
        disabled: false,
        theme: 'dark',
        type: 'text'
      },
      slots: {
        'icon-start': '<div class="icon-start">Start Icon</div>',
        'icon-end': '<div class="icon-end">End Icon</div>'
      }
    });
  });

  it('renders input element with correct props', () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('id')).toBe('test-id');
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('disabled')).toBeUndefined();
    expect(wrapper.find('.input__label').text()).toBe('Test Label');
  });

  it('renders error message when errorMessage prop is set', async () => {
    expect(wrapper.find('.input__input').exists()).toBe(true);
    const errorMEssage = await wrapper.find('fitx-error-message');
    console.log(errorMEssage)
    expect(errorMEssage.exists()).toBe(true);
    expect(wrapper.findComponent('fitx-error-message').props('text')).toBe('Test Error');
  });

  it('renders slot content for icon-start and icon-end', () => {
    expect(wrapper.find('.input__icon--start').html()).toContain('<div class="icon-start">Start Icon</div>');
    expect(wrapper.find('.input__icon--end').html()).toContain('<div class="icon-end">End Icon</div>');
  });

  it('updates modelValue when input value changes', async () => {
    const input = wrapper.find('input');
    await input.setValue('new value');
    expect(wrapper.vm.modelValue).toBe('new value');
  });

  it('disables the input when isDisabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.find('input').attributes('disabled')).toBe('true');
  });

  it('applies the correct theme class', () => {
    expect(wrapper.find('[data-theme]').attributes('data-theme')).toBe('dark');
  });
});
