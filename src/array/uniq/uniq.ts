import type { ValueGetter } from '../@types';

/**
 * Returns a copy of the array without duplicate items, based on their value or `valueGetter` return value if provided
 * @example
 * arrayUniq([1, 2, 1, 3, 3, 4, 5]); // -> [1, 2, 3, 4, 5]
 * const arr = [{
 *     id: 1,
 * }, {
 *     id: 2,
 * }, {
 *     id: 1,
 * }];
 * arrayUniq(arr, (item) => item.id);
 * // returns
 * // [{
 * //     id: 1,
 * // }, {
 * //     id: 2,
 * // }]
 **/
export function arrayUniq<T>(array: Array<T>, valueGetter?: ValueGetter<T>) {
    const alreadyFound: T[] = [];
    return array.filter((item) => {
        const currValue = typeof valueGetter === 'function' ? valueGetter(item) : item;
        if (alreadyFound.includes(currValue)) {
            return false;
        }
        alreadyFound.push(currValue);
        return true;
    });
}
