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

    it.skip('computes focusedResultId correctly when activeElement is a result element', async () => {
        const suggestions = [{ value: 'Option 1' }, { value: 'Option 2' }];
        const wrapper = mount(AutoSuggest, {
            props: {
                suggestions,
            },
        });

        const input = wrapper.find('input');
        await input.setValue('Option');
        await nextTick();

        const resultItem = wrapper.find('#auto-suggest-results-item-0');
        await resultItem.trigger('focus');

        // Trigger the computed property to recalculate
        await wrapper.vm.$nextTick();
        const result = wrapper.vm.$.setupState.focusedResultId;

        console.log('result', result);

        // input.dispatchEvent(new Event('focus'));
        // await nextTick();
        console.log('html', wrapper.findComponent({ name: 'BaseInput' }).html());
        console.log('wrapper.find(\'input\'', wrapper.find('input').html());

        // Expect the computed property to be the id of the activeElement
        expect(wrapper.find('input').toBe('results-item-0'))
        // expect(result).toBe('results-item-0');
    });

    it('returns undefined for focusedResultId when activeElement is not a result element', async () => {
        const wrapper = mount(AutoSuggest);

        // Set activeElement to an input element
        const inputEl = wrapper.find('input');
        await inputEl.trigger('click');
        // console.log('activeElement', inputEl.element, document.activeElement);
        console.log('wrapper.vm.focusedResultId;', wrapper.vm.focusedResultId, wrapper.vm.focusedResultId);

        const result = wrapper.vm.focusedResultId;

        expect(result).toBeUndefined();
    });

    it('computes getNextElement correctly when activeElement is a result element', () => {

    });
});
