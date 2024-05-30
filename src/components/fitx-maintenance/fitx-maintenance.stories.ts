import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxMaintenance from './fitx-maintenance.vue';
import { useMaintenance } from '@/composables/use-maintenance';
import { ref } from 'vue';

const fakeGetMaintenanceStatus = (sync: boolean): boolean | Promise<boolean> => {
  if (sync) {
    return Math.random() < 0.5;
  } else {
    // Asynchroner Fall
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() < 0.5);
      }, 1000);
    });
  }
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Maintenance',
  component: FitxMaintenance,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Badge',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `blubber`,
      },
    },
  },
} satisfies Meta<typeof FitxMaintenance>;

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
        story: `**Just a UI** Component for Maintenance Mode in FitX Applications. Demo with automatic interval checking from the Composable (@/composables/use-maintenance).
          `,
      },
    },
  },
};

export const Usage: Story = {
  args: {
    theme: 'dark',
    title: () => `Beispielimplementierung`,
    // copy: (_) => (`Copy Text`),
    copy: `Copy Text`,
    'after-copy': () => `Hier könnte noch ein Button hin`,
    // msg: 'Test'
  },
  decorators: [
    (story, context) => {
      return {
        setup() {
          const { startMaintenanceObserver, reCheck, isInMaintenanceMode } = useMaintenance({
            interval: 5000,
            getMaintenanceStatus: async () => fakeGetMaintenanceStatus(true),
          });

          startMaintenanceObserver();

          return {
            story,
            reCheck,
            isInMaintenanceMode,
            context,
          };
        },
        template: `
          <div style="background: var(--brand-color-anthracite-0); color: #fff;">
            <div style="padding: 1rem; border-bottom: 1px solid #fff;">
              <h2>Demo Controls</h2>
              <pre>isInMaintenanceMode {{ isInMaintenanceMode }}</pre>
              <p><button @click="reCheck()">Re-Check</button></p>
            </div>
            <story />
          </div>`,
      };
    },
  ],
};

export const JustManualCheck: Story = {
  parameters: {
    disable: true,
    controls: {
      disable: true,
      // exclude: /^hello*/ },
    },
    docs: {
      description: {
        story: `This demo includes a manual testing function. The interval check ('startMaintenanceObserver') has been deactivated.`,
      },
    },
  },
  render: (args) => ({
    components: { FitxMaintenance },
    setup() {
      const { reCheck, isInMaintenanceMode } = useMaintenance({
        interval: 5000,
        getMaintenanceStatus: async () => fakeGetMaintenanceStatus(false),
      });

      const isLoading = ref(false);

      // startMaintenanceObserver(); // disabled for this demo

      const customCheckWithLoading = async () => {
        isLoading.value = true;
        try {
          await reCheck();
        } finally {
          isLoading.value = false;
        }
      };

      return {
        isLoading,
        customCheckWithLoading,
        isInMaintenanceMode,
        args,
      };
    },
    template: `<main style="background: var(--brand-color-anthracite-0);">
      <fitx-maintenance theme="dark">
        <template #title>Optional Title</template>
        <template #copy>Optional Copy</template>
        <template #after-copy>
          <p>Optional After Copy</p>
          <p><button @click="customCheckWithLoading()">{{ isLoading ? 'Rechecking...' : 'Recheck status' }}</button></p>
          <p>Status is maintenance?: {{ isInMaintenanceMode }}</p>
        </template>
      </fitx-maintenance>
        </main>`,
  }),
};
