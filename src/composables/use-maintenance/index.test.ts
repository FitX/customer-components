import { ref } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type MaintenanceModeOptions, useMaintenance } from './index';
// import * as vueuse from '@vueuse/core';
import { useIntervalFn } from '@vueuse/core';

vi.mock('@vueuse/core', () => ({
  useIntervalFn: vi.fn(() => ({
    resume: vi.fn(),
  })),
}));

describe('useMaintenance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set initial maintenance mode to false', () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: false,
    };
    const { isInMaintenanceMode } = useMaintenance(options);
    expect(isInMaintenanceMode.value).toBe(false);
  });

  it('should update maintenance mode correctly when boolean is provided', async () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: true,
    };
    const { reCheck, isInMaintenanceMode } = useMaintenance(options);
    await reCheck();
    expect(isInMaintenanceMode.value).toBe(true);
  });

  it('should update maintenance mode correctly when function is provided', async () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: () => true,
    };
    const { reCheck, isInMaintenanceMode } = useMaintenance(options);
    await reCheck();
    expect(isInMaintenanceMode.value).toBe(true);
  });

  it('should update maintenance mode correctly when promise is provided', async () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: Promise.resolve(true),
    };
    const { reCheck, isInMaintenanceMode } = useMaintenance(options);
    await reCheck();
    expect(isInMaintenanceMode.value).toBe(true);
  });

  it('should call useIntervalFn with correct arguments', () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: true,
      interval: 5000,
    };
    const { startMaintenanceObserver } = useMaintenance(options);
    startMaintenanceObserver();
    expect(useIntervalFn).toHaveBeenCalledWith(expect.any(Function), ref(5000), {
      immediate: true,
      immediateCallback: true,
    });
  });

  it('should use default interval if none is provided', () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: true,
    };
    const { startMaintenanceObserver } = useMaintenance(options);
    startMaintenanceObserver();
    const intervalValue = 600000;
    expect(useIntervalFn).toHaveBeenCalledWith(expect.any(Function), ref(intervalValue), {
      immediate: true,
      immediateCallback: true,
    });
  });
});
