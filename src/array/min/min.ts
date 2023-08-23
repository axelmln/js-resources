import type { ValueGetter } from '../@types';

/**
 * 
 * Returns the item with the lowest value, or the lowest value returned by `valueGetter` if provided
 * @example
 * arrayMin([5, 3, 7]); // -> 3
 * arrayMin([{amount: 5}, {amount: 3}, {amount: 7}], (item) => item.amount); // -> 3
 */
export function arrayMin<T>(array: Array<T>, valueGetter?: ValueGetter<T>) { 
    if (!array.length) return 0;

    const values = array.map(item => {
        return typeof valueGetter === 'function'
            ? valueGetter(item)
            : item;
    });
    return Math.min(...values);
}