import { computed, ref } from 'vue';

export type LoadingInfo = {
  isLoading: boolean;
  loadingText: string;
  error: Error | null,
};

export type LoadingState = Map<string, LoadingInfo>;

export type UseLoadingOptions<T> = {
  asyncFn: (() => Promise<T>) | (() => T);
  id: string;
  loadingText?: string;
}

export const loadingState = ref<LoadingState>(new Map());

// const isLoading = ref<boolean>(false);
export const useLoading = <T = unknown>(options: UseLoadingOptions<T>) => {
  const result = ref<T>();
  const {
    asyncFn,
    id,
    loadingText = 'wird geladen',
  } = options;

  const setError = (error: Error) => {
    // isLoading.value = false;
    const loadingInfo = loadingState.value.get(id);
    if (loadingInfo) {
      loadingInfo.error = error;
    }
  };

  const clearError = () => {
    const loadingInfo = loadingState.value.get(id);
    if (loadingInfo) {
      loadingInfo.error = null;
    }
  };

  const start = () => {
    // isLoading.value = true;
    loadingState.value.set(id, { isLoading: true, loadingText, error: null });
  };
  const end = () => {
    // isLoading.value = false;
    const loadingInfo = loadingState.value.get(id);
    if (loadingInfo) {
      loadingInfo.isLoading = false;
    }
  };

  const execute = async () => {
    start();
    clearError();
    try {
      result.value = await asyncFn();
    } catch (err) {
      setError(err as Error);
    } finally {
      end();
    }
    return result.value;
  };

  return {
    // isLoading,
    loadingState,
    // containsActiveLoadings: computed(() => [...loadingState.value.values()].some((state) => state.isLoading)),
    activeLoadingStates: computed(() => [...loadingState.value.values()].filter((state) => state.isLoading)),
    errorLoadingStates: computed(() => [...loadingState.value.values()].filter((state) => state.error)),
    isLoading: computed(() => !!loadingState.value.get(id)?.isLoading),
    hasError: computed(() => !!loadingState.value.get(id)?.error),
    execute,
    start,
    end,
  };
};
