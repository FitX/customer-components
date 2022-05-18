<template>
  <section
    :id="id"
    :class="[ getModifierClasses('accordion', modifier), { 'accordion--dark' : isDarkMode } ]"
    class="accordion">
    <template
      v-for="(item, index) in items"
      :key="index">
      <h1 class="accordion__title">
        <button
          type="button"
          @click="update(index)"
          :aria-expanded="checkShow(index)"
          class="accordion__trigger"
          :aria-controls="`section${index}`"
          :id="`content${index}`">
          <span class="accordion__title-content">
            <!--
              @slot title[index] dynamic Content Slot
            -->
            <slot :name="`title${index}`">
              {{ item.title }}
            </slot>
          </span>
          <base-radio
            :model-value="modelValue"
            aria-role="none"
            :value="index"
            class="radio"
            aria-hidden="true" />
        </button>
      </h1>
      <div
        :id="`section${index}`"
        role="region"
        :data-hidden="!item.open"
        :hidden="!checkShow(index)"
        :aria-labelledby="`content${index}`"
        class="accordion__panel">
        <!--
            @TODO dynamic slot declaration
            @slot content[index] dynamic Content Slot
          -->
        <slot :name="`content${index}`">
          {{ item.content }}
        </slot>
      </div>
    </template>
  </section>
</template>

<script>
import { watch } from 'vue';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import BaseRadio from '@/components/base-radio/BaseRadio.vue';

/**
 * @typedef {number|Array<number>} AccordionModel
 */

export const modifier = [
  'todo',
];

export default {
  name: 'AccordionContent',
  components: { BaseRadio },
  props: {
    /**
     * Option to render in Dark Mode (Currently no explicit Styles)
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * Component Modifier
     */
    modifier: {
      type: [String, Array],
      default: null,
      validator: (value) => validateValueWithList(value, modifier),
    },
    items: {
      type: Array,
      required: true,
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
    id: {
      type: String,
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
    const { getModifierClasses } = useModifier();
    const checkShow = (index) => {
      if (typeof props.modelValue === 'object') {
        return props.modelValue.includes(index);
      }
      console.log(props.modelValue, index);
      return props.modelValue === index;
    };
    watch(() => props.modelValue, (val) => {
      console.log('val', val);
    });
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
      getModifierClasses,
      checkShow,
      update,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@use '~@/assets/styles/mixin-reset.scss' as reset;

.accordion {
  $self: &;
  --accordion-spacing: 24px;
  --accordion-border-color: var(--brand-color-gray-plumb);
  border: 1px solid var(--accordion-border-color);
  border-radius: 10px;

  &__title {
    font-size: 1.8rem;
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
    &:not(:last-of-type) {
      border-bottom: 1px solid var(--accordion-border-color);
    }
  }

  &__trigger {
    @include reset.btn-reset();
    padding: var(--accordion-spacing);
    background: none;
    display: grid;
    justify-items: start;
    width: 100%;
    gap: 1.6rem;
    grid-template-columns: 2.4rem 1fr;
    text-align: left;
    border-bottom: 1px solid var(--accordion-border-color);
    #{$self}__title:last-of-type &:not([aria-expanded=true]) {
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
