import { arraySum } from '../sum';
import type { ValueGetter } from '../@types';

/**
 * Returns average value of array items or values returned by `valueGetter`
 * @example
 * arrayAverage([7, 20, 3]); // -> 10
 * arrayAverage([{amount: 5}, {amount: 7}, {amount: 12}], (item) => item.amount); // -> 8
 * */
export function arrayAverage<T>(array: Array<T>, valueGetter?: ValueGetter<T>) { 
    if (!array.length) return 0;

    const sum = arraySum(array, valueGetter);
    return sum / array.length;
}
