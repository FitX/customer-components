/**
 * validator function
 * @param value
 * @param list
 * @returns {boolean}
 */
export default function (value, list = []) {
  if (!value) {
    return false;
  }
  if (typeof value === 'object') {
    const filtered = list.filter((mod) => value.includes(mod));
    return filtered.length > 0;
  }
  return list.includes(value);
}
