import { arrayAverage } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        /**
         * Returns average value of array items or values returned by `valueGetter`
         * @example
         * [7, 20, 3].average(); // -> 10
         * [{amount: 5}, {amount: 7}, {amount: 12}].average((item) => item.amount); // -> 8
         * */
        average(valueGetter?: ValueGetter<T>): number;
    }
}

extendNativeArray(
    'average',
    function<T>(this: Array<T>, valueGetter?: ValueGetter<T>) {
        return arrayAverage(this, valueGetter);
    }
);
