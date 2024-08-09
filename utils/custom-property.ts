/**
 * get value from custom property
 * @example:
 * const css = `
 *   :root {
 *     --primary-color: red;
 *     --secondary-color: var(--primary-color);
 *     --background-color: var(--secondary-color);
 *   }
 * `;
 * getCustomPropertyValue(css, '--background-color') -> 'red'
 */
export const getCustomPropertyValue = (css: string, property: string): string | null => {
  const customProperties: Map<string, string> = new Map();

  // get Custom Properties
  const customPropertyRegex = /(--[\w-]+)\s*:\s*([^;]+)/g;
  let match: RegExpExecArray | null;

  while ((match = customPropertyRegex.exec(css)) !== null) {
    const property = match[1].trim();
    const value = match[2].trim();
    customProperties.set(property, value);
  }

  // recursive if value is property
  const resolvePropertyValue = (prop: string): string | null => {
    if (!customProperties.has(prop)) {
      return null;
    }

    const value = customProperties.get(prop)!;
    const referencedPropertyRegex = /var\((--[\w-]+)\)/;
    const referencedMatch = referencedPropertyRegex.exec(value);

    if (referencedMatch) {
      return resolvePropertyValue(referencedMatch[1].trim());
    }

    return value;
  }

  return resolvePropertyValue(property);
};
