import { describe, it, expect, vi, afterEach } from 'vitest';
import { defineComponent, type PropType, ref, nextTick, defineExpose } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { type SharedInputProps, useInput } from './index';
/*
vi.mock('@vueuse/core', async () => {
  const core = await vi.importActual('@vueuse/core')

  return {
    ...core as typeof VueUse,
    useFocusWithin: core.useFocusWithin
  }
})*/

const TestComponent = defineComponent({
  props: {
    propsAsObject: {
      type: Object as PropType<SharedInputProps>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    defineExpose({ ...useInput(props.propsAsObject, ref(props.modelValue)) });
    return {
      ...useInput(props.propsAsObject, ref(props.modelValue)),
    };
  },
  template: `
    <div
      :class="componentClasses"
      ref="wrapperEl">
      <label
        for="input"
      >
        <span>{{ $props.propsAsObject.label }}</span>
      </label>
      <slot name="icon-start"></slot>
      <slot name="icon-end"></slot>

      <input v-model="modelValue" id="input" type="text" />
    </div>
  `,
});

describe('useInput', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize correctly', () => {
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: false,
          errorMessage: '',
          fakeModifier: 'hover',
        },
        // } as SharedInputProps,
        modelValue: '',
      },
      slots: {
        'icon-start': '<span class="icon-start"></span>',
        'icon-end': '<span class="icon-end"></span>',
      },
    });

    expect(wrapper.classes()).toContain('input');
    expect(wrapper.classes()).toContain('input--fake-hover');
    expect(wrapper.classes()).not.toContain('is-filled');
    expect(wrapper.classes()).not.toContain('is-active');
    expect(wrapper.find('.icon-start').exists()).toBe(true);
    expect(wrapper.find('.icon-end').exists()).toBe(true);
  });

  it('should update when modelValue changes', async () => {
    // const modelValue = ref('initial value');
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: false,
          errorMessage: '',
        },
        modelValue: 'initial value',
      },
    });

    const input = wrapper.find('input');

    expect(input.element.value).toBe('initial value');
    expect(wrapper.classes()).toContain('input');
    expect(wrapper.classes()).toContain('input--is-filled');

    await input.setValue('');

    expect(input.element.value).toBe('');
    expect(wrapper.classes()).not.toContain('input--is-filled');
  });

  it('should handle focus state correctly', async () => {
    const TestComponent = defineComponent({
      props: {
        propsAsObject: {
          type: Object as PropType<SharedInputProps>,
          required: true,
        },
        modelValue: {
          type: [String, Number],
          required: true,
        },
      },
      setup(props) {
        defineExpose({ ...useInput(props.propsAsObject, ref(props.modelValue)) });
        return {
          ...useInput(props.propsAsObject, ref(props.modelValue)),
        };
      },
      template: `

      <input v-model="modelValue" id="input" type="text" />

  `,
    });
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: false,
          errorMessage: '',
        },
        modelValue: '',
      },
      attachTo: document.body,
    });

    const input = wrapper.find('input');
    input.element.focus();
    await flushPromises();
    expect(document.activeElement).toBe(input.element);
  });

  it('should handle focus state correctly', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: false,
          errorMessage: '',
        },
        modelValue: '',
      },
      attachTo: document.body,
    });

    const input = wrapper.find('input');

    expect(wrapper.classes()).not.toContain('input--is-active');
    input.element.focus();
    await nextTick();
    expect(wrapper.classes()).toContain('input--is-active');
    await nextTick();
  });

  it('should handle disabled state correctly', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: true,
          errorMessage: '',
        },
        modelValue: '',
      },
      attachTo: document.body,
    });

    expect(wrapper.classes()).toContain('input--disabled');
  });

  it('should handle error state correctly', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        propsAsObject: {
          label: 'Test Label',
          disabled: false,
          errorMessage: 'Error',
        },
        modelValue: '',
      },
      attachTo: document.body,
    });

    expect(wrapper.classes()).toContain('input--has-error');
  });
});
