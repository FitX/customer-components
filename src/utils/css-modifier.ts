const getModifierClass = (defaultClass: string, modifier: string) => (`${defaultClass}--${modifier}`);
export const getModifierClasses = (defaultClass: string, modifiers: string | string[]) => {
  if (!modifiers) {
    return [];
  }
  if (typeof modifiers === 'string') {
    return [getModifierClass(defaultClass, modifiers)];
  }
  return modifiers.map((mod) => (getModifierClass(defaultClass, mod)));
};
