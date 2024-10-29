
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FitxDialog } from './index';

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('FitxDialog', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(FitxDialog);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the dialog with the correct title', () => {
    const wrapper = mount(FitxDialog, {
      props: {
        title: 'Test Dialog',
      },
    });

    expect(wrapper.find('.dialog__title').text()).toBe('Test Dialog');
  });

  it('opens the dialog when isOpen is set to true', async () => {
    const wrapper = mount(FitxDialog, {
      props: {
        modelValue: false,
        isModal: true,
      },
    });

    await wrapper.setProps({ modelValue: true });

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('closes when clicking outside if closeOnOutside is true', async () => {
    const wrapper = mount(FitxDialog, {
      props: {
        closeOnOutside: true,
        modelValue: true,
      },
    });

    // Simulate click outsid
    const clickEvent = new MouseEvent('click');
    document.body.dispatchEvent(clickEvent);

    // Wait for close
    await wrapper.vm.$nextTick();

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.close).toHaveBeenCalled();
    expect(wrapper.emitted().closed).toBeTruthy();
  });

  it('does not close when clicking outside if closeOnOutside is false', async () => {
    const wrapper = mount(FitxDialog, {
      props: {
        closeOnOutside: false,
        modelValue: true,
      },
    });

    // Simulate click outside
    const clickEvent = new MouseEvent('click');
    document.body.dispatchEvent(clickEvent);

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialogEl.close).not.toHaveBeenCalled();
    expect(wrapper.emitted().closed).toBeFalsy();
  });
});
