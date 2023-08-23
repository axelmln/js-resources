/**
 * 
 * Returns a copy of input object with specified default properties
 * @example
 * function foo(options) {
 *      options = defaultProperties(options, {
 *          prop1: true,
 *          prop2: 100,
 *          ...
 *      });
 * }
 */
export function defaultProperties<T>(object: T, defaultProperties: Partial<T>) {
    return Object.assign({}, defaultProperties, object);
}
