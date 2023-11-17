import { nextTick } from 'vue';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AutoSuggest from '@/components/auto-suggest/AutoSuggest.vue';

describe('AutoSuggest', () => {
    it('renders correctly with default props', () => {
        const wrapper = shallowMount(AutoSuggest);
        expect(wrapper.exists()).toBe(true);
    });

    it('emits update:modelValue when input changes', async () => {
        const wrapper = mount(AutoSuggest);
        const input = wrapper.find('input');
        await input.setValue('test');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test']);
    });

    it('opens and closes results when the trigger button is clicked', async () => {
        const wrapper = mount(AutoSuggest, {
            props: {
                showResultsTrigger: true,
                suggestions: [{ value: 1 }]
            },
        });

        const button = wrapper.find('button');
        await button.trigger('click');
        await flushPromises();
        expect(wrapper.vm.isExpanded).toBe(true);

        await button.trigger('click');
        expect(wrapper.vm.isExpanded).toBe(false);
    });

    it('selects a result when a result item is clicked', async () => {
        const suggestions = [{ value: 'Option 1' }, { value: 'Option 2' }];
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions,
            },
        });

        const resultItem = wrapper.find('.auto-suggest-results__item');
        await resultItem.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([suggestions[0].value]);
    });

    it('generateId works correctly', () => {
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions: [
                    { value: 'Result 1' },
                ],
            }});
        const resultItem = wrapper.find('.auto-suggest-results__item');
        expect(resultItem.element.id).toBe('auto-suggest-results-item-0');

        const wrapperWithId = mount(AutoSuggest, {
            props: {
                id: 'demo',
                suggestions: [
                    { value: 'Result 2' },
                ],
            }});
        const resultItemWithCustomId = wrapperWithId.find('.auto-suggest-results__item');
        expect(resultItemWithCustomId.element.id).toBe('demo-results-item-0');
    });

    it.skip('computes focusedResultId correctly when activeElement is a result element', async () => {
    });

    it('open and close results works correctly on curser navigation', async () => {
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions: [
                    { value: 'Result 0' },
                    { value: 'Result 1' },
                    { value: 'Result 2' },
                ],
            }});
        expect(wrapper.vm.$.setupState.isExpanded).toBe(false);
        const input = wrapper.find('input');
        // const resultItems = wrapper.findAll('.auto-suggest-results__item');
        await input.setValue('result ')
        await input.trigger('keydown.down');
        // await wrapper.vm.$nextTick();
        expect(wrapper.vm.$.setupState.isExpanded).toBe(true);
    });

    it('dirty check', async () => {
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions: [
                    { value: 'Result 0' },
                    { value: 'Result 1' },
                    { value: 'Result 2' },
                ],
            }});
        expect(wrapper.vm.$.setupState.isTouched).toBe(false);
        const input = wrapper.find('input');
        await input.trigger('click');
        await input.trigger('blur');
        // await wrapper.vm.$nextTick();
        expect(wrapper.vm.$.setupState.isTouched).toBe(true);
    });

    it.skip('open and close results works correctly on input', async () => {
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions: [
                    { value: 'Result 0' },
                    { value: 'Result 1' },
                    { value: 'Result 2' },
                ],
            }});
        expect(wrapper.html()).not.toContain('.auto-suggest-results--is-expanded');
        const input = wrapper.find('input');
        input.value = 'test';
        wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain('.auto-suggest-results--is-expanded');
    });
});
