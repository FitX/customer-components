import type { SharedInputProps } from '@/composables/use-input';

export type InputProps = SharedInputProps & {
  type?: HTMLInputElement['type'];
  /**
   * HTMLLabelElement['attributes'] - without all defined base props (e.g. id)
   */
  labelAttributes?: HTMLLabelElement['attributes'];
  /**
   * HTMLInputElement['attributes'] - without all defined base props (e.g. id or type)
   */
  inputAttributes?: HTMLInputElement['attributes'];
};
