import { defineCustomElement } from 'vue';
import VueErrorMessage from '@/components/error-message/ErrorMessage.vue';
import VueTextButton from '@/components/text-button/TextButton.vue';
import VueBaseInput from '@/components/base-input/BaseInput.vue';
import VueDateInput from '@/components/date-input/DateInput.vue';
import VueBaseTextarea from '@/components/base-textarea/BaseTextarea.vue';
import VueBaseButton from '@/components/base-button/BaseButton.vue';
import VueBaseOption from '@/components/base-option/BaseOption.vue';
import VueBaseOptionForm from '@/components/base-option-form/BaseOptionForm.vue';
import VueBaseCheckbox from '@/components/base-checkbox/BaseCheckbox.vue';
import VueBaseRadio from '@/components/base-radio/BaseRadio.vue';
import VueFilterChip from '@/components/filter-chip/FilterChip.vue';
import VueInfoBox from '@/components/info-box/InfoBox.vue';
import VueBaseBanner from '@/components/base-banner/BaseBanner.vue';
import VueProgressBar from '@/components/progress-bar/ProgressBar.vue';
import styles from '@/assets/styles/lib.scss';

export const ErrorMessage = defineCustomElement(VueErrorMessage);
export const TextButton = defineCustomElement(VueTextButton);
export const BaseInput = defineCustomElement(VueBaseInput);
export const DateInput = defineCustomElement(VueDateInput);
export const BaseTextarea = defineCustomElement(VueBaseTextarea);
export const BaseButton = defineCustomElement(VueBaseButton);
export const BaseOption = defineCustomElement(VueBaseOption);
export const BaseOptionForm = defineCustomElement(VueBaseOptionForm);
export const BaseCheckbox = defineCustomElement(VueBaseCheckbox);
export const BaseRadio = defineCustomElement(VueBaseRadio);
export const FilterChip = defineCustomElement(VueFilterChip);
export const InfoBox = defineCustomElement(VueInfoBox);
export const BaseBanner = defineCustomElement(VueBaseBanner);
export const ProgressBar = defineCustomElement(VueProgressBar);
export { styles };

export function register() {
  customElements.define('error-message', ErrorMessage);
  customElements.define('base-button', BaseButton);
}
