import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type MaintenanceModeOptions, useMaintenance } from './index';
// import * as vueuse from '@vueuse/core';
import { useIntervalFn } from '@vueuse/core';

const getMaintenanceStatusMock = vi.fn().mockReturnValueOnce(true);
vi.mock('@vueuse/core', () => ({
  useIntervalFn: vi.fn().mockImplementation(() => {
    return {
      resume: getMaintenanceStatusMock,
      pause: vi.fn(),
      isActive: ref(false),
    };
  }),
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
      interval: ref(5000),
    };
    const { startMaintenanceObserver } = useMaintenance(options);
    startMaintenanceObserver();
    expect(useIntervalFn).toHaveBeenCalledWith(expect.any(Function), ref(5000), {
      immediate: true,
      immediateCallback: true,
    });
  });

  it('should call useIntervalFn with updated interval', () => {
    const interval = ref(2000);
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: true,
      interval,
    };
    interval.value = 5000;
    const { startMaintenanceObserver } = useMaintenance(options);
    startMaintenanceObserver();
    expect(useIntervalFn).toHaveBeenCalledWith(expect.any(Function), ref(5000), {
      immediate: true,
      immediateCallback: true,
    });
  });
});

describe('useMaintenance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call useIntervalFn with reCheck and correct arguments', async () => {
    const options: MaintenanceModeOptions = {
      getMaintenanceStatus: getMaintenanceStatusMock,
    };

    expect(getMaintenanceStatusMock).not.toHaveBeenCalled();
    expect(useIntervalFn).not.toHaveBeenCalled();
    const { startMaintenanceObserver } = useMaintenance(options);
    startMaintenanceObserver();

    expect(getMaintenanceStatusMock).toHaveBeenCalled();
    expect(useIntervalFn).toHaveBeenCalled();
  });
});
