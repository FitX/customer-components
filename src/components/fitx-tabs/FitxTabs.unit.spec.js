import { nextTick } from 'vue';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FitxTabs from '@/components/fitx-tabs/FitxTabs.vue';

describe('FitxTabs', () => {
    it('renders correctly with default props', () => {
        const wrapper = shallowMount(FitxTabs);
        expect(wrapper.exists()).toBe(true);
    });
});
