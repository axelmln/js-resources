/**
 * 
 * Returns the last item of the array
 * @example
 * arrayLast(['foo', 'bar', 'fuu']); // -> 'fuu'
 */
export function arrayLast<T>(array: Array<T>) { 
    if (!array.length) return undefined;

    return array[array.length - 1];
}
