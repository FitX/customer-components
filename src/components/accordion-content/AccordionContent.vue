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
          {{ item.title }}
          <span class="accordion__icon"></span>
        </button>
      </h1>
      <div
        :id="`section${index}`"
        role="region"
        :data-hidden="!item.open"
        :hidden="!checkShow(index)"
        :aria-labelledby="`content${index}`"
        class="accordion__panel">
        <div>
          <!--
            @TODO dynamic slot declaration
            @slot content[index] dynamic Content Slot
          -->
          <slot :name="`content${index}`">
            {{ item.content }}
          </slot>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { watch } from 'vue';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';

/**
 * @typedef {number|Array<number>} AccordionModel
 */

export const modifier = [
  'todo',
];

export default {
  name: 'AccordionContent',
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
@import '~@/assets/styles/mixin-reset.scss';
.accordion {
  $self: &;
  --accordion-spacing-h: 1rem;

  margin: 0;
  padding: 0;
  border: 2px solid hsl(0deg 0% 52%);
  border-radius: 7px;
  width: 20em;

  &:focus-within {
    border-color: hsl(216deg 94% 43%);

    &__title {
      background-color: hsl(0deg 0% 97%);
    }
  }

  &__title {
    position: relative;
  }

  &__icon {
    border: solid currentColor;
    border-width: 0 2px 2px 0;
    height: 0.5rem;
    pointer-events: none;
    position: absolute;
    right: 2em;
    top: 50%;
    transform: translateY(-60%) rotate(45deg);
    width: 0.5rem;

    [aria-expanded="true"] & {
      transform: translateY(-50%) rotate(-135deg);
    }
  }
}

[hidden] {
  display: none;
}
</style>
