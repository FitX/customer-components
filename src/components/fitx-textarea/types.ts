import type { SharedInputProps } from '@/composables/use-input';
// import { type TextareaHTMLAttributes } from 'vue';

// export type TextareaProps = SharedInputProps & TextareaHTMLAttributes;
export type TextareaProps = SharedInputProps & {
  maxLength?: number;
  errorMessageMaxLength?: string;
  rows?: number;
  fieldSizing?: boolean;
};
