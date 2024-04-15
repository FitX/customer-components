import { formatDateFromIso, formatDateToIso } from '@/use/formatDate';
import '@testing-library/jest-dom';

describe('Format Date ', () => {
  test('formatDateToIso() returns iso from dotted date', () => {
    expect(formatDateToIso()).toBe(null);
    const input = '22.11.2011';
    const result = formatDateToIso(input);
    expect(result).toBe('2011-11-22');
  });

  test('formatDateToIso() returns dotted date from iso', () => {
    expect(formatDateFromIso()).toBe(null);
    const input = '1984-08-11';
    const result = formatDateFromIso(input);
    expect(result).toBe('11.08.1984');
  });
});
