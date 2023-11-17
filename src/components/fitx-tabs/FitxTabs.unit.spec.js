import { nextTick } from 'vue';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import '@testing-library/jest-dom';
import FitxTabs from '@/components/fitx-tabs/FitxTabs.vue';

describe('FitxTabs', () => {
    it('renders correctly with default props', () => {
        const wrapper = shallowMount(FitxTabs);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders with correct attributes', async () => {
        const tabs = [
            { title: 'Tab 1', content: 'Content 1' },
            { title: 'Tab 2', content: 'Content 2' },
            { title: 'Tab 3', content: 'Content 3' },
        ];
        const wrapper = mount(FitxTabs, {
            props: {
                tabs,
                selectedTab: 1,
            },
        });

        const expectedDefault = `<div class="tabs" style="--tabs-item-count: 3; --tabs-current-index: 1;">
      <div class="tabs__nav" role="tablist" aria-labelledby="fitx-tab"><button id="fitx-tab-0" data-tab-trigger-index="0" type="button" role="tab" class="tabs__trigger" aria-selected="false" tabindex="-1" aria-controls="fitx-tab-content-0">
          <!--
               @slot tab Slot
             --><span>Tab 1</span>
        </button><button id="fitx-tab-1" data-tab-trigger-index="1" type="button" role="tab" class="tabs__trigger tabs__trigger--is-active" aria-selected="true" aria-controls="fitx-tab-content-1">
          <!--
               @slot tab Slot
             --><span>Tab 2</span>
        </button><button id="fitx-tab-2" data-tab-trigger-index="2" type="button" role="tab" class="tabs__trigger" aria-selected="false" tabindex="-1" aria-controls="fitx-tab-content-2">
          <!--
               @slot tab Slot
             --><span>Tab 3</span>
        </button>
        <div class="slider"></div>
      </div>
      <div id="fitx-tab-content-0" role="tabpanel" class="tabs__panel tabs__panel--is-hidden" tabindex="0" aria-labelledby="fitx-tab-0">
        <!--
             @slot tabpanel Slot
           -->Content 1
      </div>
      <div id="fitx-tab-content-1" role="tabpanel" class="tabs__panel" tabindex="0" aria-labelledby="fitx-tab-1">
        <!--
             @slot tabpanel Slot
           -->Content 2
      </div>
      <div id="fitx-tab-content-2" role="tabpanel" class="tabs__panel tabs__panel--is-hidden" tabindex="0" aria-labelledby="fitx-tab-2">
        <!--
             @slot tabpanel Slot
           -->Content 3
      </div>
    </div>
`;

        const expectedAfterTabChange = `<div class="tabs" style="--tabs-item-count: 3; --tabs-current-index: 2;">
      <div class="tabs__nav" role="tablist" aria-labelledby="fitx-tab"><button id="fitx-tab-0" data-tab-trigger-index="0" type="button" role="tab" class="tabs__trigger" aria-selected="false" tabindex="-1" aria-controls="fitx-tab-content-0">
          <!--
               @slot tab Slot
             --><span>Tab 1</span>
        </button><button id="fitx-tab-1" data-tab-trigger-index="1" type="button" role="tab" class="tabs__trigger" aria-selected="false" aria-controls="fitx-tab-content-1" tabindex="-1">
          <!--
               @slot tab Slot
             --><span>Tab 2</span>
        </button><button id="fitx-tab-2" data-tab-trigger-index="2" type="button" role="tab" class="tabs__trigger tabs__trigger--is-active" aria-selected="true" aria-controls="fitx-tab-content-2">
          <!--
               @slot tab Slot
             --><span>Tab 3</span>
        </button>
        <div class="slider"></div>
      </div>
      <div id="fitx-tab-content-0" role="tabpanel" class="tabs__panel tabs__panel--is-hidden" tabindex="0" aria-labelledby="fitx-tab-0">
        <!--
             @slot tabpanel Slot
           -->Content 1
      </div>
      <div id="fitx-tab-content-1" role="tabpanel" class="tabs__panel tabs__panel--is-hidden" tabindex="0" aria-labelledby="fitx-tab-1">
        <!--
             @slot tabpanel Slot
           -->Content 2
      </div>
      <div id="fitx-tab-content-2" role="tabpanel" class="tabs__panel" tabindex="0" aria-labelledby="fitx-tab-2">
        <!--
             @slot tabpanel Slot
           -->Content 3
      </div>
    </div>
`;

        const replaceWhitsSpace = (string) => string.replace(/\s/g, '');
        expect(replaceWhitsSpace(wrapper.html())).toBe(replaceWhitsSpace(expectedDefault));
        await wrapper.find('#fitx-tab-2').trigger('click')
        // wrapper.vm.$.setupState.selectTabIndex(2);
        await wrapper.vm.$nextTick();
        expect(replaceWhitsSpace(wrapper.html())).toBe(replaceWhitsSpace(expectedAfterTabChange));
    });

    it('renders the correct number of tabs', () => {
        const wrapper = mount(FitxTabs, {
            props: {
                tabs: [
                    { title: 'Tab 1', content: 'Content 1' },
                    { title: 'Tab 2', content: 'Content 2' },
                ],
            }});
        const tabs = wrapper.findAll('.tabs__trigger');
        expect(tabs.length).toBe(2);
    });

    it('generateId works correctly', () => {
        const wrapper = mount(FitxTabs, {
            props: {
                tabs: [
                    { title: 'Tab 1', content: 'Content 1' },
                ],
            }});
        const tab = wrapper.find('.tabs__trigger');
        expect(tab.element.id).toBe('fitx-tab-0');

        const wrapperWithId = mount(FitxTabs, {
            props: {
                id: 'demo',
                tabs: [
                    { title: 'Tab 1', content: 'Content 1' },
                ],
            }});
        const tabWithCustomId = wrapperWithId.find('.tabs__trigger');
        expect(tabWithCustomId.element.id).toBe('demo-0');
    });

    it('selects tab by index and emits "selected" event', async () => {
        const tabs = [
            { title: 'Tab 1', content: 'Content 1' },
            { title: 'Tab 2', content: 'Content 2' },
            { title: 'Tab 3', content: 'Content 3' },
        ];

        const wrapper = mount(FitxTabs, {
            props: {
                tabs,
                selectedTab: 1,
            },
        });

        const focusedTab = wrapper.findAll('.tabs__trigger')[1];
        const toBeNextFocusedTab = wrapper.findAll('.tabs__trigger')[2];
        expect(focusedTab.attributes('aria-selected')).toBe('true');


        await toBeNextFocusedTab.trigger('click');
        expect(focusedTab.attributes('aria-selected')).toBe('false');
        expect(toBeNextFocusedTab.attributes('aria-selected')).toBe('true');

        // await wrapper.vm.$nextTick();
        expect(wrapper.emitted('selected')).toHaveLength(1);
        expect(wrapper.emitted('selected')[0]).toEqual([2]);
    });

    it('selectTabIndex works correctly', () => {
        const tabs = [
            { title: 'Tab 1', content: 'Content 1' },
            { title: 'Tab 2', content: 'Content 2' },
            { title: 'Tab 3', content: 'Content 3' },
        ];
        const wrapper = mount(FitxTabs, {
            props: {
                tabs,
            },
        });

        /**
         * @TODO optimize
         * compare
         * wrapper.vm.$.setupState
         * vs.
         * export functions from excluded file
         * vs.
         * vue expose function with (import.meta.env.MODE === 'test') wrapper
         *
         */
        expect(wrapper.vm.$.setupState.selectTabIndex(2));
        expect(wrapper.emitted('selected')[0]).toEqual([2]);

        // fallback to first if larger
        expect(wrapper.vm.$.setupState.selectTabIndex(3));
        expect(wrapper.emitted('selected')[1]).toEqual([0]);

        // fallback to end if index is < 0
        expect(wrapper.vm.$.setupState.selectTabIndex(-1));
        expect(wrapper.emitted('selected')[2]).toEqual([2]);
    });
});
