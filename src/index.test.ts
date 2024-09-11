import { describe, it, expect } from 'vitest';
import { FitxErrorMessage } from './index';
import { useMaintenance } from './index';

describe('components', () => {
  it('should be defined', () => {
    expect(FitxErrorMessage).toBeDefined();
  });
});

describe.skip('composables', () => {
  it('should be defined', () => {
    expect(useMaintenance).toBeDefined();
  });
});
