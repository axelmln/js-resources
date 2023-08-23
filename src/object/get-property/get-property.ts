/**
 * Returns `object` property at specified `path`.  
 * `path` can be a string or an array of valid object keys. Array indexes can also be used.  
 * If the path does not exists, `fallbackValue` will be returned.  
 * @example
 * const value = getProperty({
 *     prop: 'foo',
 *     nested: {
 *         nestedProp: 'bar',
 *     },
 * }, 'nested.nestedProp'); // -> 'bar'
 * //////////////////////////////////////
 * const value = getProperty({ prop: 'foo' }, ['prop2', 'nestedProp'], 'fallback'); // -> 'fallback'
 */
export function getProperty<T>(
    object: T,
    path: string | (string | number | symbol)[],
    fallbackValue: any
) {
    if (typeof path === 'string') path = path.split('.');

    let currValue: any = object;
    for (const key of path) {
        const breakNow =
            typeof currValue !== 'object' ||
            currValue === null ||
            !(key in currValue);
        if (breakNow) {
            currValue = fallbackValue;
            break;
        }
        currValue = currValue[key];
    }

    return currValue;
}
