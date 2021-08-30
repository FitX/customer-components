import validateValueWithList from '@/use/validateValueWithList';

describe('validateValueWithList', () => {
  it('returns false when no value', () => {
    expect(validateValueWithList()).toBeFalsy();
  });

  it('returns true if a value matches list', () => {
    const list = ['foo', 'bar'];
    const input = ['frank', 'foo', 'baz'];
    expect(validateValueWithList(input, list)).toBeTruthy();
  });
});
