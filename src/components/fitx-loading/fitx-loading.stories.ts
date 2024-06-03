import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, watch } from 'vue'
import FitxLoading from './fitx-loading.vue';
import { type LoadingInfo, loadingState, useLoading } from '@/composables';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Loading',
  component: FitxLoading,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxLoading>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `fitx-loading are used when retrieving data or performing slow computations, and help to notify users that loading is processing`,
      },
    },
  },
};

export const ExampleMultiLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: `Example with multiple Loadings, display as Text. Usage with useLoading composable.`,
      },
    },
  },
  decorators: [
    (story, context) => {
      return {
        setup() {
          type ExtendedLoadingInfo<K extends string> = LoadingInfo & { id: K };

          const messages = computed(() => true);
          // const awaitTimeout = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
          const someCall = async () => {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return 'Data loaded successfully';
          };

          const otherCall = async () => {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 4000));
            return 'Data loaded successfully too';
          };

          const {
            execute,
          } = useLoading({
            asyncFn: someCall,
            id: 'get-data',
            loadingText: 'wichtige Informationen',
          });

          const {
            execute: anotherCallExecute,
          } = useLoading({
            asyncFn: otherCall,
            id: 'another',
            loadingText: 'andere wichtige Informationen',
          });

          const fakeLoadAll = () => {
            execute();
            anotherCallExecute();
          };

          const allLoadingStates = computed<ExtendedLoadingInfo<string>[]>(() => [...Array.from(loadingState.value).reduce((acc, [key, value]) => {
            if (value.isLoading) {
              acc.set(key, { ...value, id: key });
            }
            return acc;
          }, new Map()).values()].filter((item) => item.isLoading));
          const allLoadingTexts = computed(() => {
            const activeLoadings = allLoadingStates.value.map((item) => item.loadingText);
            if (activeLoadings?.length > 0) {
              return `${activeLoadings.toString().replace(',', ' und ')} werden geladen`;
            }
            return undefined;
          });

          context.args.isActive = false;

          watch(allLoadingStates, (val) => {
            if (val?.length > 0) {
              context.args.showDescription = true;
              context.args.isActive = true;
            } else {
              context.args.showDescription = false;
              context.args.isActive = false;
            }
          });

          watch(allLoadingTexts, (val) => {
            context.args.description = val;
          })

          return {
            messages,
            story,
            context,
            fakeLoadAll,
            allLoadingStates,
            allLoadingTexts,
          };
        },
        template: `
          <section>
            <story />
            <p><button @click="fakeLoadAll">Start Loading</button></p>
          </section>`,
      };
    },
  ],
};
