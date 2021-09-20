// This is a super basic way of mapping Vue props to argTypes in cases
// where Storybook (or rather vue-docgen-api) fails.
// See https://github.com/storybookjs/storybook/issues/11774

import { baseInputProps } from '@/components/base-input/BaseInput';

const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

const controlTypeMappings = {
  String: 'text',
  Boolean: 'boolean',
  Array: 'object',
  Object: 'object',
  Number: 'number'
}

const getPropControlType = ({ type = null }) => {
  if (!Array.isArray(type)) {
    return controlTypeMappings[type.name]
  }

  return 'text'
}

const getPropTypeSummary = ({ type = null }) => {
  if (!type) {
    return null
  }

  if (Array.isArray(type)) {
    const typeNames = type.map(t => t.name.toLowerCase())
    return typeNames.join('|')
  }

  return type.name.toLowerCase()
}

/**
 * Get default value for table
 * @todo Would kind of like to write out `null` but Storybook doesn't, so...
 */
const getPropDefaultValueSummary = prop => {
  if (Object.prototype.hasOwnProperty.call(prop, 'default')) {
    switch (toType(prop.default)) {
      case 'function':
        return JSON.stringify(prop.default())
      case 'string':
        return `'${prop.default}'`
      default:
        return prop.default
    }
  }

  return null
}

/**
 * Extract information about props as closely as possible to what vue-docgen-api
 * and the Storybook backend would do if props were defined normally.
 * @note This is a workaround. It will not be perfect. Define props normally were possible.
 * @see https://github.com/storybookjs/storybook/blob/master/addons/docs/src/frameworks/vue/extractArgTypes.ts
 * @see https://github.com/storybookjs/storybook/blob/master/addons/docs/src/lib/docgen/createPropDef.ts
 */
export const mapPropToArgType = (prop = {}, argType = {}) => {
  const newArgType = {
    ...argType,
    control: {
      type: getPropControlType(prop),
      ...argType.control
    },
    type: {
      required: !!prop.required,
      summary: getPropTypeSummary(prop),
      ...argType.type
    },
    table: {
      category: 'props',
      ...argType.table
    }
  }

  const defaultValueSummary = getPropDefaultValueSummary(prop)
  if (defaultValueSummary !== null) {
    newArgType.table.defaultValue = {
      summary: defaultValueSummary,
      ...argType?.table?.defaultValue
    }
  }

  return newArgType
}

/**
 * Transform props to array and map them to mapPropToArgType
 * @note This is a dirty workaround! @TODO watch Bugs below
 * @link https://gist.github.com/webdesignberlin/7d3aae9565323357c796759401d1b7d8
 * @see https://github.com/storybookjs/storybook/issues/11774
 * @see https://github.com/vue-styleguidist/vue-styleguidist/issues/1092
 * @see https://github.com/storybookjs/storybook/issues/12331
 * @example argTypes: { ...mapPropToArgTypes(baseInputProps) }
 * @param props
 * @return {{[p: number]: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, reduce: {(callbackfn: (previousValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, (callbackfn: (previousValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, initialValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, <U>(callbackfn: (previousValue: U, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => U, initialValue: U): U}, some(predicate: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => unknown, thisArg?: any): boolean, splice: {(start: number, deleteCount?: number): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[], (start: number, deleteCount: number, ...items: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]}, forEach(callbackfn: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => void, thisArg?: any): void, shift(): ({name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}} | undefined), length: number, concat: {(...items: ConcatArray<{name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}>): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[], (...items: ConcatArray<{name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}> | {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]}, sort(compareFn?: (a: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, b: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}) => number): this, reverse(): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[], push(...items: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]): number, pop(): ({name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}} | undefined), filter: {<S extends {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}>(predicate: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => value is S, thisArg?: any): S[], (predicate: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => unknown, thisArg?: any): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]}, lastIndexOf(searchElement: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, fromIndex?: number): number, slice(start?: number, end?: number): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[], toString(): string, unshift(...items: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]): number, join(separator?: string): string, reduceRight: {(callbackfn: (previousValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, (callbackfn: (previousValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, initialValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}): {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, <U>(callbackfn: (previousValue: U, currentValue: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, currentIndex: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => U, initialValue: U): U}, indexOf(searchElement: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, fromIndex?: number): number, every: {<S extends {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}>(predicate: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => value is S, thisArg?: any): this is S[], (predicate: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => unknown, thisArg?: any): boolean}, map<U>(callbackfn: (value: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}, index: number, array: {name: *, control: *&{type: *|string}, type: *&{summary: null|*, required}, table: *&{category: string}}[]) => U, thisArg?: any): U[], toLocaleString(): string}}
 */
export const mapPropToArgTypes = (props) => {
  // convert props to array of props and map to args
  const mappedArray = Object.keys(props).map((key) => ({
    name: key,
    ...mapPropToArgType(props[key]),
  }));
  return {
    ...mappedArray,
  };
}
