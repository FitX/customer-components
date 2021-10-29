import { ref } from 'vue';

/**
 * Get Modifier Class by BEM Syntax
 * @return {
 * {refComponent: ToRef<null>,
 * componentModifier: ToRef<null>,
 * getModifierClasses: ((function(string, (Array|string)): (Array|string))|*),
 * getModifierClass: (function(*, *): string)}}
 */
export default function useModifier() {
  const componentModifier = ref(null);
  const refComponent = ref(null);
  const getModifierClass = (defaultClass, modifier) => (`${defaultClass}--${modifier}`);
  /**
   * Get Modifier Classes
   *
   * @param {string} defaultClass
   * @param {Array | string} modifiers
   * @returns {Array | string}
   */
  const getModifierClasses = (defaultClass, modifiers) => {
    if (!modifiers) {
      return null;
    }
    if (typeof modifiers === 'string') {
      return [getModifierClass(defaultClass, modifiers)];
    }
    return modifiers.map((mod) => {
      if (mod) {
        return `${defaultClass}--${mod}`;
      }
      return null;
    });
  };
  return {
    componentModifier,
    refComponent,
    getModifierClass,
    getModifierClasses,
  };
}
