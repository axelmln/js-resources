import type { ValueGetter } from '../@types';

/**
 * 
 * Returns the item with the highest value, or the highest value returned by `valueGetter` if provided
 * @example
 * arrayMax([5, 7, 3]); // -> 7
 * arrayMax([{amount: 5}, {amount: 7}, {amount: 3}], (item) => item.amount); // -> 7
 */
export function arrayMax<T>(array: Array<T>, valueGetter?: ValueGetter<T>) { 
    if (!array.length) return 0;

    const values = array.map(item => {
        return typeof valueGetter === 'function'
            ? valueGetter(item)
            : item;
    });
    return Math.max(...values);
}
