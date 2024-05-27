import { type MaybeRefOrGetter, readonly, ref, toValue } from 'vue'
import { useIntervalFn } from '@vueuse/core';

// type BoolOrFunction = boolean | (() => boolean) | (() => Promise<boolean>) | Promise<boolean>;
// type BoolOrFunction = boolean | Promise<boolean> | (() => boolean);

export interface MaintenanceModeOptions {
  interval?: MaybeRefOrGetter<number>; // in ms
  getMaintenanceStatus: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
}

const DEFAULT_INTERVAL = 600000; // 600000 = 10 minutes

export const useMaintenance = (options: MaintenanceModeOptions) => {
  const { interval: intervalFromOptions = DEFAULT_INTERVAL, getMaintenanceStatus } = options;

  const interval = ref(toValue(intervalFromOptions));
  const isInMaintenanceMode = ref(false);

  const reCheck = async (getMaintenanceStatus: MaintenanceModeOptions['getMaintenanceStatus']) => {
    /* let status = isInMaintenanceMode.value;
    if (typeof getMaintenanceStatus === 'boolean') {
      status = getMaintenanceStatus;
    } else if (typeof getMaintenanceStatus === 'function') {
      const funcResult = await getMaintenanceStatus();
      if (typeof funcResult === 'function') {
        status = funcResult;
      } else {
        status = funcResult;
      }

    }
    isInMaintenanceMode.value = status; */
    /* let status = isInMaintenanceMode.value;
    if (typeof getMaintenanceStatus === 'boolean') {
      status = getMaintenanceStatus;
    } else if (typeof getMaintenanceStatus === 'function') {
      status = await getMaintenanceStatus();
    }
    isInMaintenanceMode.value = status; */
    let status: boolean = isInMaintenanceMode.value;
    if (typeof getMaintenanceStatus === 'boolean') {
      status = getMaintenanceStatus;
    } else {
      const result = getMaintenanceStatus;
      if (result instanceof Promise) {
        status = await result;
      } else {
        status = await result();
      }
    }
    isInMaintenanceMode.value = status;
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

  return {
    startMaintenanceObserver: () =>
      startMaintenanceObserver(getMaintenanceStatus, interval).resume(),
    reCheck: () => reCheck(getMaintenanceStatus),
    isInMaintenanceMode: readonly(isInMaintenanceMode),
  };
};
