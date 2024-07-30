import type { InputHTMLAttributes } from '@vue';
import type { SharedInputProps } from '@/composables/use-input';

export type SwitchModifier = 'disabled';

export type SwitchProps = SharedInputProps<InputHTMLAttributes> & {
  textOn?: string;
  textOff?: string;
  modifier?: SwitchModifier;
};
