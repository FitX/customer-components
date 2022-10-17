<template>
  <div
    :class="[
      { 'accordion-item--dark' : isDarkMode } ]"
    class="accordion-item">
    <h1
      class="accordion-item__title">
      <button
        type="button"
        @click="update(index)"
        :aria-expanded="checkShow(index)"
        class="accordion-item__trigger"
        :aria-controls="`section${index}`"
        :id="`content${index}`">
          <span class="accordion-item__title-content">
            <!--
              @slot title
            -->
            <slot name="title">
              {{ item.title }}
            </slot>
          </span>
        <base-radio
          :model-value="modelValue"
          aria-role="none"
          :value="index"
          class="radio"
          :is-dark-mode="isDarkMode"
          aria-hidden="true" />
      </button>
    </h1>
    <div
      :id="`section${index}`"
      role="region"
      :hidden="!checkShow(index)"
      v-show="checkShow(index)"
      :aria-labelledby="`content${index}`"
      class="accordion-item__panel">
      <!--
          @slot content Content Slot
        -->
      <slot name="content">
        {{ item.content }}
      </slot>
    </div>
  </div>
</template>

<script>
import BaseRadio from '@/components/base-radio/BaseRadio.vue';

/**
 * @typedef {number|Array<number>} AccordionModel
 */
export default {
  name: 'AccordionItem',
  components: { BaseRadio },
  props: {
    /**
     * Option to render in Dark Mode (Currently no explicit Styles)
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
      }),
    },
    /**
     * @model
     * Index or Index List of Items to display open items
     */
    modelValue: {
      type: [Array, Number],
      default: -1,
      required: true,
    },
    /**
     * Required Index to identify open/closed items
     */
    index: {
      type: Number,
      require: true,
    },
  },
  emits: [
    /**
     * Fires on Model Update
     * @property {AccordionModel} val - opened Accordion Items
     */
    'update:modelValue',
  ],
  setup(props, { emit }) {
    const checkShow = (index) => {
      if (typeof props.modelValue === 'object') {
        return props.modelValue.includes(index);
      }
      return props.modelValue === index;
    };
    /**
     * Update
     * @param {AccordionModel} index
     */
    const update = (index) => {
      /**
       * @TODO handle array / number
       */
      if (typeof props.modelValue === 'object') {
        // if multi open is allowed
        const exist = props.modelValue.includes(index);
        if (exist) {
          emit('update:modelValue', props.modelValue.filter((alreadySetIndex) => alreadySetIndex !== index));
        } else {
          emit('update:modelValue', [
            ...props.modelValue,
            index,
          ]);
        }
      } else {
        // if single open
        emit('update:modelValue', index);
      }
    };
    return {
      checkShow,
      update,
    };
  },
};
</script>

<style scoped lang="scss">
@use '~@/assets/styles/mixin-reset.scss' as reset;

.accordion-item {
  $self: &;

  --accordion-color: var(--brand-color-anthracite);

  &--dark{
    --accordion-color: #fff;
  }

  color: var(--accordion-color);

  &__title {
    font-size: 1.125rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
    &-content {
      width: 100%;
    }
  }

  &__panel {
    padding: var(--accordion-spacing);
    font-weight: 300;
    border-bottom: 1px solid var(--accordion-border-color);
    #{$self}:last-of-type & {
      border-bottom: none;
    }
  }

  &__trigger {
    @include reset.btn-reset();
    padding: var(--accordion-spacing);
    background: none;
    display: grid;
    color: inherit;
    justify-items: start;
    width: 100%;
    gap: 1rem;
    grid-template-columns: 1.5rem 1fr;
    text-align: left;
    border-bottom: 1px solid var(--accordion-border-color);
    #{$self}:last-of-type &[aria-expanded="false"] {
      border-bottom: none;
    }
  }

  &:focus-within {
    // --accordion-border-color: var(--brand-color-anthracite)
  }
}

[hidden] {
  display: none;
}

.radio {
  pointer-events: none;
  order: -1;
}
</style>
