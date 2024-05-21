import { type MaybeRefOrGetter, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export interface MaintenanceModeOptions {
  interval?: MaybeRefOrGetter<number>; // in ms
  getMaintenanceStatus: () => boolean | Promise<boolean>;
}

// const DEFAULT_INTERVAL = ref(600000); // 600000 = 10 minutes
const DEFAULT_INTERVAL = ref(600000); // 600000 = 10 minutes

export const isInMaintenanceMode = ref(false);

const reCheck = async (getMaintenanceStatus: MaintenanceModeOptions['getMaintenanceStatus']) => {
  isInMaintenanceMode.value = await getMaintenanceStatus();
};

const startMaintenanceObserver = (
  getMaintenanceStatus: MaintenanceModeOptions['getMaintenanceStatus'],
  interval?: MaybeRefOrGetter<number>
) => {
  return useIntervalFn(() => reCheck(getMaintenanceStatus), interval || DEFAULT_INTERVAL, {
    immediate: true,
    immediateCallback: true
  });
};

export const useMaintenance = (options: MaintenanceModeOptions) => {
  const { interval = DEFAULT_INTERVAL, getMaintenanceStatus } = options;

  return {
    startMaintenanceObserver: () =>
      startMaintenanceObserver(getMaintenanceStatus, interval).resume(),
    reCheck: () => reCheck(getMaintenanceStatus),
    isInMaintenanceMode
  };
};
