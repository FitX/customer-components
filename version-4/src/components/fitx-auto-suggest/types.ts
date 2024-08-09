import type { SharedInputProps } from '@/composables/use-input';

export type AutoSuggestProps = SharedInputProps & {
  type?: HTMLInputElement['type'];
};
