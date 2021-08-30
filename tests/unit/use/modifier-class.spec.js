import useModifier from '@/use/modifier-class';

const { getModifierClass, getModifierClasses } = useModifier();

describe('modifier-class', () => {
  it('getModifierClass() returns class name in correct form', () => {
    const result = getModifierClass('foo', 'bar');
    expect(result).toBe('foo--bar');
  });

  it('getModifierClasses() returns class name in correct form', () => {
    expect(getModifierClasses()).toBeNull();
    expect(getModifierClasses('foo', 'bar')).toEqual(['foo--bar']);
    expect(getModifierClasses('foo', ['play', 'doo'])).toEqual(['foo--play', 'foo--doo']);
  });
});
