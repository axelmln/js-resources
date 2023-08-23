/**
 * Returns input value if it is an array, otherwise returns it wrapped in an array.  
 * @example
 * asArray(['foo']); // -> ['foo']
 * asArray('foo'); // -> ['foo']
 */
export function asArray<T>(value: T): Array<T extends Array<any> ? T[number] : T> {
    // @ts-ignore
    return Array.isArray(value) ? value : [value];
}
