import type { SortingOrder, ValueGetter } from "../@types";

/**
 * Sorts array items alphabetically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided
 * @example
 * arraySortAlpha(['abc', 'bac', 'aaa']); // -> ['aaa', 'abc', 'bac']
 * arraySortAlpha(['abc', 'bac', 'aaa'], 'descending'); // -> ['bac', 'abc', 'aaa']
 * const arr = [{
 *     ref: 'abc',
 * }, {
 *     ref: 'bac',
 * }, {
 *     ref: 'aaa',
 * }];
 * arraySortAlpha(arr, 'descending', (item) => item.ref);
 * // returns
 * // [{
 * //     ref: 'bac',
 * // }, {
 * //     ref: 'abc',
 * // }, {
 * //     ref: 'aaa',
 * // }]
 **/
export function arraySortAlpha<T>(array: Array<T>,  order: SortingOrder = 'ascending', valueGetter?: ValueGetter<T>) {
    return array.sort((a, b) => {
        if (order === "descending") [a, b] = [b, a];
        if (typeof valueGetter === 'function') {
            a = valueGetter(a);
            b = valueGetter(b);
        }
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    });
}
