<template>
  <div
    :class="[
      { 'status--dark' : isDarkMode },
      { 'status--hide-online' : !showOnline },
      isOnline ? 'status--online' : 'status--offline',
      ]"
    class="status">
    <div class="status__content">
      <span
        class="status__icon">
        <icon-online v-if="isOnline" />
        <icon-offline v-if="!isOnline" />
      </span>
      <span
        v-if="offlineInfo && !isOnline"
        class="status__info">
        {{ offlineInfo }}
      </span>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue';
import { useOnline, refDebounced } from '@vueuse/core';
import useModifier from '@/use/modifier-class';
import validateValueWithList from '@/use/validate-value-with-list';
import IconOnline from '@/assets/icons/icon-online.svg';
import IconOffline from '@/assets/icons/icon-offline.svg';

export default {
  name: 'StatusNotification',
  emits: [
    /**
     * Fires on going online
     */
    'is-online',
    /**
     * Fires on going offline
     */
    'is-offline',
  ],
  props: {
    /**
     * Duration before fire offline Event in ms
     */
    offlineThrottle: {
      type: Number,
      default: 0,
    },
    /**
     * If true: show positive Indicator
     */
    showOnline: {
      type: Boolean,
      default: true,
    },
    /**
     * Info Text if offline mode is detected
     */
    offlineInfo: {
      type: String,
      default: null,
    },
    /**
     * Option to render in Dark Mode
     */
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    /**
     * Detect online/offline on Mount
     */
    initialDetection: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IconOnline,
    IconOffline,
  },
  setup(props, { emit }) {
    const isOnline = refDebounced(useOnline(), props.offlineThrottle);

    watch(isOnline, (val) => {
      const emitStatus = val ? 'is-online' : 'is-offline';
      emit(emitStatus);
    }, {
      immediate: props.initialDetection,
    });
    return {
      isOnline,
    };
  },
};
</script>

<style scoped lang="scss">
// @use currently only with dart-sass
// @use '~@/assets/styles/mixins.scss' as mixin;
@import '~@/assets/styles/mixin-reset.scss';
.status {
  $self: &;
  --notification-border-radius: 6px;
  --notification-spacing-h: 1.063rem;
  --notification-spacing-v: 0.875rem;
  --notification-icon-size: 1.125rem;
  --notification-icon-fill: var(--functional-color-success);
  --notification-background: var(--functional-color-success-1-light);
  --notification-color: var(--brand-color-anthracite);
  background: var(--notification-background);
  color: var(--notification-color);
  border-radius: var(--notification-border-radius);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.313rem;
  padding: var(--notification-spacing-v) var(--notification-spacing-h);
  display: inline-grid;
  grid-template-columns: 1fr;
  place-items: start;

  &--hide-online {
    &:not(#{$self}--offline) {
      display: none;
    }
  }

  &--offline {
    --notification-background: var(--functional-color-attention-1-light);
    --notification-icon-fill: var(--functional-color-attention);
  }

  &--dark {
    --notification-background: var(--functional-color-success-1-dark);
    --notification-color: var(--brand-color-white);
    &#{$self}--offline {
      --notification-background: var(--functional-color-attention-1-dark);
    }
  }

  &__content {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--notification-spacing-h);
  }

  &__info {
    &:empty {
      display: none;
    }
  }

  &__icon {
    --icon-fill: var(--notification-icon-fill);
    --icon-width: var(--notification-icon-size);
    --icon-height: var(--notification-icon-size);
    line-height: 0;
    // extra designer spacing -.- dont scale at all
    margin-top: 1px;
    &:empty {
      display: none;
    }
  }
}
</style>
