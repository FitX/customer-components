import { describe, it, expect } from 'vitest';
import { FitxMaintenance, FitxButton, useMaintenance } from './index';

describe('components', () => {
  it('should be defined', () => {
    expect(FitxMaintenance).toBeDefined();
    expect(FitxButton).toBeDefined();
  });
});

describe('composables', () => {
  it('should be defined', () => {
    expect(useMaintenance).toBeDefined();
  });
});
