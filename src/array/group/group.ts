import { toObject } from '../_common';
import type { ValueGetter } from '../@types';

/**
 * Groups array items in the property (of the returned object) matching their `valueGetter` return value
 * @example
 * arrayGroup([{
 *      ref: 'foo',
 *      prop: 'bar',
 * }, {
 *      ref: 'fuu',
 *      prop: 'ber',
 * }, {
 *      ref: 'foo',
 *      prop: 'baz',
 * }], (item) => item.ref);
 * // returns:  
 * // {
 * //   foo: [{
 * //       ref: 'foo',
 * //        prop: 'bar',
 * //    },{
 * //        ref: 'foo',
 * //        prop: 'baz',
 * //    }],
 * //    fuu: [{
 * //        ref: 'fuu',
 * //        prop: 'ber',
 * //    }],
 * // }
 * 
 * */
export function arrayGroup<T>(array: Array<T>, valueGetter: ValueGetter<T>): { [key: string]: T[] } {
    return toObject(array, (table, value) => {
        const groupIdentifier = valueGetter(value);
        return table[groupIdentifier]
            ? table[groupIdentifier].push(value)
            : table[groupIdentifier] = (array.constructor as any).from([value]);
    });
}
