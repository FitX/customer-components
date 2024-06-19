<script lang="ts" setup>
import { computed, toValue } from 'vue';
import { FitxLabel, FitxErrorMessage } from '@/components';
import { getModifierClasses } from '@/utils/css-modifier';
import type { FitxInputProps } from '@/components/fitx-input/types'
const props = withDefaults(defineProps<FitxInputProps>(), {
  type: 'text',
  id: () => crypto.randomUUID(),
});
const modelValue = defineModel<string | number>({ default: '' });
const componentClasses = computed(() => [
  'input',
  ...getModifierClasses('input', props.disabled ? 'disabled' : []),
  ...getModifierClasses('input', props.fakeModifier ? `fake-${props.fakeModifier}` : []),
  ...getModifierClasses('input', toValue(modelValue) ? 'is-filled' : []),
]);
</script>

<template>
  <fitx-label
    :text="props.label"
    :for="props.id" />
  <input
    :type="type"
    v-model="modelValue"
    :class="componentClasses" />
  <fitx-error-message
    v-if="errorMessage"
    :text="props.errorMessage || ''" />
</template>

<style lang="scss" scoped>
.input {
}
</style>
