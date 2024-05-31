import { ref } from 'vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLoading, loadingState } from './index';

describe('useLoading', () => {
  beforeEach(() => {
    loadingState.value.clear(); // Setze den Zustand vor jedem Test zurück
  });

  it('should initialize with given options', () => {
    const asyncFn = async () => 'test';
    const { isLoading, hasError, execute } = useLoading({ asyncFn, id: 'test' });

    expect(isLoading.value).toBe(false);
    expect(hasError.value).toBe(false);
    expect(execute).toBeDefined();
  });

  it('should start loading and set loading state correctly', async () => {
    const asyncFn = async () => 'test';
    const { isLoading, execute } = useLoading({ asyncFn, id: 'test' });

    const executePromise = execute();
    expect(isLoading.value).toBe(true);
    await executePromise;
  });

  it('should end loading and set loading state correctly', async () => {
    const asyncFn = async () => 'test';
    const { isLoading, execute } = useLoading({ asyncFn, id: 'test' });

    await execute();
    expect(isLoading.value).toBe(false);
  });

  it('should handle errors correctly', async () => {
    const error = new Error('test error');
    const asyncFn = async () => { throw error; };
    const { hasError, execute } = useLoading({ asyncFn, id: 'test' });

    await execute();
    expect(hasError.value).toBe(true);
  });

  it('should clear error before executing', async () => {
    const error = new Error('test error');
    const asyncFn = async () => { throw error; };
    const { hasError, execute } = useLoading({ asyncFn, id: 'test' });

    await execute();
    expect(hasError.value).toBe(true);

    const successFn = async () => 'success';
    const { execute: executeSuccess } = useLoading({ asyncFn: successFn, id: 'test' });

    await executeSuccess();
    expect(hasError.value).toBe(false);
  });

  it('should track multiple loading states', async () => {
    const asyncFn1 = async () => 'test1';
    const asyncFn2 = async () => 'test2';
    const { execute: execute1, isLoading: isLoading1 } = useLoading({ asyncFn: asyncFn1, id: 'test1' });
    const { execute: execute2, isLoading: isLoading2 } = useLoading({ asyncFn: asyncFn2, id: 'test2' });

    const promise1 = execute1();
    const promise2 = execute2();

    expect(isLoading1.value).toBe(true);
    expect(isLoading2.value).toBe(true);

    await promise1;
    await promise2;

    expect(isLoading1.value).toBe(false);
    expect(isLoading2.value).toBe(false);
  });

  it('should manage active and error loading states correctly', async () => {
    const asyncFn1 = async () => 'test1';
    const error = new Error('test error');
    const asyncFn2 = async () => { throw error; };

    const { execute: execute1, activeLoadingStates, errorLoadingStates } = useLoading({ asyncFn: asyncFn1, id: 'test1' });
    const { execute: execute2 } = useLoading({ asyncFn: asyncFn2, id: 'test2' });

    await execute1();
    await execute2();

    expect(activeLoadingStates.value.length).toBe(0);
    expect(errorLoadingStates.value.length).toBe(1);
  });
});

