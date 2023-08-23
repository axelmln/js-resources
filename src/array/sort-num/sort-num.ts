import type { SortingOrder, ValueGetter } from "../@types";

/**
 * Sorts array items numerically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided
 * @example
 * arraySortNum([1, 3, 2, 0, -3]); // -> [-3, 0, 1, 2, 3]
 * arraySortNum([1, 3, 2, 0, -3], 'descending'); // -> [3, 2, 1, 0, -3]
 * const arr = [{
 *     amount: 0,
 * }, {
 *     amount: -3,
 * }, {
 *     amount: 3,
 * }];
 * arraySortNum(arr, 'descending', (item) => item.amount);
 * // returns
 * // [{
 * //     amount: 3,
 * // }, {
 * //     amount: 0,
 * // }, {
 * //     amount: -3,
 * // }]
 **/
export function arraySortNum<T>(array: Array<T>,  order: SortingOrder = 'ascending', valueGetter?: ValueGetter<T>) {
    return array.sort((a, b) => {
        if (order === 'descending') [a, b] = [b, a];
        if (typeof valueGetter === 'function') {
            a = valueGetter(a);
            b = valueGetter(b);
        }

        return Number(a) - Number(b);
    });
}
