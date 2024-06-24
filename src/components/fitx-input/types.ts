import type { SharedInputProps } from '@/composables/use-input';

export type InputProps = SharedInputProps & {
  type?: HTMLInputElement['type'];
};
