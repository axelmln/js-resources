import type { ValueGetter } from "../@types";

/**
 * Returns the sum of the array item values, or `valueGetter` return values if provided
 * @example
 * arraySum([5, 7, 3]); // -> 15
 * const arr = [{
 *     amount: 5,
 * }, {
 *     amount: 7,
 * }, {
 *     amount: 3,
 * }];
 * arraySum(arr, (item) => item.amount); // -> 15
 */
export function arraySum<T>(array: Array<T>, valueGetter?: ValueGetter<T>) { 
    if (!array.length) return 0;

    return array.reduce((acc, item) => {
        const currValue = typeof valueGetter === 'function'
            ? valueGetter(item)
            : item;
        return acc + Number(currValue)
    }, 0);    
}
