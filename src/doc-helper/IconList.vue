<template>
  <ul class="color-list">
    <li
      class="color-list__item"
      v-for="(color, index) in uniqueColors"
      :key="index"
      :title="color.name"
      @click="updateIconFill(color.value)"
      :style="`--color-picker-bg: ${color.value}; --indicator-color: ${color.value}`">
      <span
        v-if="color.value === selectedBackgroundFill"
        class="indicator indicator--bg">H</span>
      <span
        v-if="color.value === selectedIconFill"
        class="indicator indicator--icon">I</span>
    </li>
    <li
      class="color-list__item color-list__item--custom">
      <span>Custom:</span>
      <sp-theme scale="large" color="dark">
        <sp-color-slider></sp-color-slider>
      </sp-theme>
    </li>
  </ul>
  <section>
    <sp-theme scale="large" color="light">
      <sp-switch
        :checked="colorTarget === 'ICON'"
        @click="toggleColorTarget()">
        Hintergrund / Icon Farbe {{ colorTarget }}
      </sp-switch>
    </sp-theme>
    <label>
      Größe in px <input type="number" v-model.number="selectedIconSize">
    </label>
  </section>
  <section
    class="detail">
    <template v-if="detail">
      <h1>{{ detail.name }}</h1>
      <a
        v-if="detail.source"
        :href="detail.source.url" target="_blank">Quelle: {{ detail.source.name }}</a>
    </template>
  </section>
  <ul
    class="icon-list"
    :style="
    `--icon-fill: ${selectedIconFill};
    --icon-list-item-bg: ${selectedBackgroundFill};
    --icon-width: ${selectedIconSize / 10}rem;
    --icon-height: ${selectedIconSize / 10}rem`">
    <li
      v-for="icon in icons"
      :index="icon.name"
      class="icon-list__item"
      @click="showDetail(icon.name)">
      <component :is="icon.component" />
    </li>
  </ul>
</template>

<script>
import { computed, ref } from 'vue';
import { useColor } from '@/doc-helper/useColors';
// import '@spectrum-web-components/theme/sp-theme.js';
// import '@spectrum-web-components/color-slider/sp-color-slider.js';

const COLOR_TARGET_ENUMS = {
  ICON: 'ICON',
  BG: 'BG',
};

export default {
  props: {
    icons: {
      type: Array,
      default: () => [],
    },
  },
  /* mounted() {
    const themejs = document.createElement('script');
    themejs.setAttribute('src', 'https://jspm.dev/@spectrum-web-components/bundle/elements.js');
    themejs.setAttribute('type', 'module');
    document.head.appendChild(themejs);
  }, */
  setup(props) {
    const {
      colors,
    } = useColor();
    const colorTarget = ref(COLOR_TARGET_ENUMS.ICON);
    const selectedIconFill = ref('#181D1E');
    /**
     * PX for Design Visual, recalculate to rem
     * @type {Ref<UnwrapRef<string>>}
     */
    const selectedIconSize = ref('18');
    const selectedBackgroundFill = ref('#fff');
    function updateIconFill(color) {
      if (colorTarget.value === COLOR_TARGET_ENUMS.ICON) {
        selectedIconFill.value = color;
      }
      if (colorTarget.value === COLOR_TARGET_ENUMS.BG) {
        selectedBackgroundFill.value = color;
      }
    }
    const detail = ref(null);
    function showDetail(componentName) {
      detail.value = props.icons
        .filter((icon) => icon.name === componentName)?.[0];
    }
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }
    function toggleColorTarget() {
      colorTarget.value = colorTarget.value === COLOR_TARGET_ENUMS.ICON
        ? COLOR_TARGET_ENUMS.BG : COLOR_TARGET_ENUMS.ICON;
    }
    const uniqueColors = computed(() => getUniqueListBy(colors.value, 'value'));
    return {
      detail,
      uniqueColors,
      showDetail,
      updateIconFill,
      selectedIconFill,
      toggleColorTarget,
      colorTarget,
      selectedBackgroundFill,
      COLOR_TARGET_ENUMS,
      selectedIconSize,
    };
  },
};
</script>

<style scoped lang="scss">
.icon-list {
  --icon-list-item-bg: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  &__item {
    padding: 2rem;
    line-height: 0;
    background: var(--icon-list-item-bg);
    cursor: pointer;
    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    }
  }
}

.color-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  &__item {
    height: 4rem;
    width: 4rem;
    background: var(--color-picker-bg);
    cursor: pointer;
    line-height: 0;
    position: relative;
    user-select: none;
    &:hover {
      transform: scale(1.5);
      border-radius: 2rem;
      transition: 0.2s ease all;
    }

    &--custom {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 2rem;
      width: auto;
      padding-left: 1rem;
    }
  }
}

.indicator {
  --indicator-spacing: 0.4rem;
  --indicator-color: #fff;
  position: absolute;
  display: inline-block;
  height: 1rem;
  width: 1rem;
  font-size: 1rem;
  color: var(--indicator-color);
  padding: var(--indicator-spacing);
  mix-blend-mode: difference;
  text-align: right;
  // backdrop-filter: invert(.7);
  &--bg {
    top: var(--indicator-spacing);
    right: var(--indicator-spacing);
  }
  &--icon {
    bottom: var(--indicator-spacing);
    right: var(--indicator-spacing);
  }
}

.detail {
  margin-bottom: 2rem;
  min-height: 8.4rem;
}
</style>
