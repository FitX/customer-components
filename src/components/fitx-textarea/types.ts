import { type TextareaHTMLAttributes } from 'vue';
import type { SharedInputProps } from '@/composables/use-input';

export type TextareaProps = SharedInputProps<TextareaHTMLAttributes> & {
  maxLength?: number;
  errorMessageMaxLength?: string;
  rows?: number;
  fieldSizing?: boolean;
};
