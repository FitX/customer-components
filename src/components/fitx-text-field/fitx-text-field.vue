<script lang="ts" setup>
import { GymxTextField } from '@fitx/gymx-ui';
import { FitxErrorMessage, IconCheckmark } from '@/components';
import type { FitxTextFieldProps, FitxTextFieldSlots } from '@/components/fitx-text-field/types';
import { computed, ref, toValue } from 'vue';
import { getModifierClasses } from '@/utils/css-modifier';

defineSlots<FitxTextFieldSlots>();
const props = defineProps<FitxTextFieldProps>();

const field = ref();

const modelValue = defineModel<string | number>({ default: '' });
const isFilled = computed(() => `${modelValue.value}`?.length > 0);

const componentRootClass = 'text-field';
const componentClasses = computed(() => [
  componentRootClass,
  getModifierClasses(componentRootClass, toValue(isFilled) ? 'is-filled' : undefined),
  getModifierClasses(componentRootClass, props.isValid ? 'is-valid' : undefined),
  getModifierClasses(componentRootClass, props.errorMessage ? 'has-error' : undefined),
]);

const focusInput = (event: PointerEvent) => {
  if (event?.target instanceof HTMLElement && event?.target?.classList?.contains('input')) {
    event?.target?.querySelector('input')?.focus();
  }
};
</script>
<template>
  <gymx-text-field
    v-bind="props"
    v-model="modelValue"
    @click="focusInput"
    ref="field"
    data-input-attributes="{ state: 'focused' }"
    :class="componentClasses">
    <!--<template v-for="(_slotFn, slotName) in slots" v-slot:[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>-->
    <template #input-start>
      <slot name="input-start"></slot>
    </template>
    <template #input-hint>
      <slot name="input-hint"></slot>
    </template>
    <template #input-error-message>
      <fitx-error-message
        :text="props.errorMessage"
        v-if="errorMessage" />
    </template>
    <template #input-end>
      <slot name="input-end">
        <IconCheckmark
          class="icon-valid"
          v-if="props.isValid" />
      </slot>
    </template>
  </gymx-text-field>
</template>
<style lang="scss">
@import '@/assets/styles/shared/text-field.scss';
</style>
