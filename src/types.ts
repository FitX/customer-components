// const isDevMode = import.meta.env !== 'foo' as const;
export type Theme = 'dark' | 'light';
export type ButtonSize = 'default' | 'small';

export const buttonStates = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'disabled',
] as const;

// export type DevType<T> = isDevMode extends true ? T : '';
// export type FakeStates = DevType<'hover' | 'focus'>;
