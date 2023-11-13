import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AutoSuggest from '@/components/auto-suggest/AutoSuggest.vue';

describe('AutoSuggest', () => {
    it('renders correctly with default props', () => {
        const wrapper = shallowMount(AutoSuggest);
        expect(wrapper.exists()).toBe(true);
        // Add more assertions based on your component structure
    });
});
