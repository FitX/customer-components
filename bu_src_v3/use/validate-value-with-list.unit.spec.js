import validateValueWithList from '@/use/validate-value-with-list';

describe('validateValueWithList', () => {
  it('returns false when no value', () => {
    expect(validateValueWithList()).toBeFalsy();
  });

  it('returns true if a value matches list', () => {
    const list = ['foo', 'bar'];
    const input = ['frank', 'foo', 'baz'];
    expect(validateValueWithList(input, list)).toBeTruthy();
  });

  it('checks if value is in list', () => {
    expect(validateValueWithList('frank', ['frank', 'micha'])).toBe(true);
    expect(validateValueWithList('frank')).toBe(false);
  });
});
