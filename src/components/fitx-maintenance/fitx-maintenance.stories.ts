import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxMaintenance from './fitx-maintenance.vue';
import { useMaintenance } from '@/composables/use-maintenance';

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
  title: 'wip ⚠/components/Maintenance',
  component: FitxMaintenance,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Badge'
    }
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
        story:
          `# ⚠ Work in Progress
          Component for Maintenance Mode in FitX Applications. We also have a composable for this. (@/composables/use-maintenance)
          `
      }
    }
  }
};

export const Usage: Story = {
  args: {
    theme: 'dark',
    title: () => `Beispielimplementierung`,
    // copy: (_) => (`Copy Text`),
    copy: `Copy Text`,
    'after-copy': () => `Hier könnte noch ein Button hin`
    // msg: 'Test'
  },
  decorators: [
    (story, context) => {
      return {
        setup() {
          const { startMaintenanceObserver, reCheck, isInMaintenanceMode } = useMaintenance({
            interval: 5000,
            getMaintenanceStatus: () => fakeGetMaintenanceStatus(true)
          });

          startMaintenanceObserver();

          return {
            story,
            reCheck,
            isInMaintenanceMode,
            context
          };
        },
        template: `<div :style="{ color: context.args.theme === 'dark' ? '#fff' : '#000'}">
          <pre>isInMaintenanceMode {{ isInMaintenanceMode }}</pre>
          <button @click="reCheck()">Start Fake Call is in Maintenance</button>
            <story />
        </div>`
      };
    }
  ]
};

export const Usage2: Story = {
  parameters: {
    disable: true,
    controls: {
      disable: true
      // exclude: /^hello*/ },
    }
  },
  render: (args) => ({
    components: { FitxMaintenance },
    setup() {
      const { startMaintenanceObserver, reCheck, isInMaintenanceMode } = useMaintenance({
        interval: 5000,
        getMaintenanceStatus: () => fakeGetMaintenanceStatus(true)
      });

      startMaintenanceObserver();

      return {
        reCheck,
        isInMaintenanceMode,
        args
      };
    },
    template: `<main style="background: var(--brand-color-anthracite-0);">
      <fitx-maintenance theme="dark">
        <template #title>Optional Title</template>
        <template #copy>Optional Copy</template>
        <template #after-copy>
          <p>Optional After Copy <button @click="reCheck()">Start Fake Call is in Maintenance</button></p>
          <p>{{ isInMaintenanceMode }}</p>
        </template>
      </fitx-maintenance>
        </main>`
  })
};
