/**
 * Format dotted Date to Iso
 * @param {String} dottedDate - Format 'dd.MM.yyyy'
 * @return {string|null}
 */
export function formatDateToIso(dottedDate = '') {
  if (dottedDate?.toString().length === 10) {
    const d = dottedDate.substring(0, 2);
    const m = dottedDate.substring(3, 5);
    const y = dottedDate.substring(6, 10);
    return `${y}-${m}-${d}`;
  }
  return null;
}

/**
 * Format Iso Date to dotted
 * @param {String} isoDate - Format 'yyyy-MM-dd'
 * @return {string|null}
 */
export function formatDateFromIso(isoDate = '') {
  if (isoDate?.toString().length === 10) {
    const y = isoDate.substring(0, 4);
    const m = isoDate.substring(5, 7);
    const d = isoDate.substring(8, 10);
    return `${d}.${m}.${y}`;
  }
  return null;
}
