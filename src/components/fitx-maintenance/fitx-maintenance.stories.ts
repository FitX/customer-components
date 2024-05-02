import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxMaintenance from './fitx-maintenance.vue';
import { useMaintenance } from '@/composables/use-maintenance';

const fakeGetMaintenanceStatus = (sync: boolean): boolean | Promise<boolean> => {
  if (sync) {
    return Math.random() < 0.5;
  } else {
    // Asynchroner Fall
    return new Promise(resolve => {
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
} satisfies Meta<typeof FitxMaintenance>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {};

export const Usage: Story = {
  args: {
    theme: 'dark',
    title: (_) => (`Beispielimplementierung`),
    copy: (_) => (`Copy Text`),
    'after-copy': () => (`Hier könnte noch ein Button hin`),
    // msg: 'Test'
  },
  decorators: [
    (story, context) => {
      return {
        setup(props, ctx) {
          const {
            startMaintenanceObserver,
            reCheck,
            isInMaintenanceMode,
          } = useMaintenance({
            interval: 5000,
            getMaintenanceStatus: () => fakeGetMaintenanceStatus(true),
          });

          startMaintenanceObserver();

          return {
            story,
            reCheck,
            isInMaintenanceMode,
            context,
          }
        },
        template: `<div :style="{ color: context.args.theme === 'dark' ? '#fff' : '#000'}">
          <pre>isInMaintenanceMode {{ isInMaintenanceMode }}</pre>
          <button @click="reCheck()">Start Fake Call is in Maintenance</button>
            <story />
        </div>`,
      };
    },
  ],
};
