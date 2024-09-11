import {
  type DeepReadonly,
  type UnwrapNestedRefs,
  type MaybeRefOrGetter,
  type Ref,
  readonly,
  ref,
} from 'vue';
import { useIntervalFn } from '@vueuse/core';
import type { Pausable } from '@vueuse/shared';

export interface MaintenanceModeOptions {
  interval?: MaybeRefOrGetter<number>; // in ms
  getMaintenanceStatus: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
}

export interface MaintenanceModeMethods {
  startMaintenanceObserver: Pausable['resume'];
  reCheck: () => Promise<void>;
  isInMaintenanceMode: DeepReadonly<UnwrapNestedRefs<Ref<boolean>>>;
}

const DEFAULT_INTERVAL = 600000; // 600000 = 10 minutes

export const useMaintenance = (options: MaintenanceModeOptions): MaintenanceModeMethods => {
  const { interval = ref(DEFAULT_INTERVAL), getMaintenanceStatus } = options;

  const isInMaintenanceMode = ref(false);

  const reCheck = async () => {
    if (typeof getMaintenanceStatus === 'boolean') {
      isInMaintenanceMode.value = getMaintenanceStatus;
    } else {
      const result = getMaintenanceStatus;
      if (result instanceof Promise) {
        isInMaintenanceMode.value = await result;
      } else {
        isInMaintenanceMode.value = await result();
      }
    }
  };

  const { resume } = useIntervalFn(reCheck, interval, {
    immediate: true,
    immediateCallback: true,
  });

  return {
    startMaintenanceObserver: resume,
    reCheck,
    isInMaintenanceMode: readonly(isInMaintenanceMode),
  };
};
