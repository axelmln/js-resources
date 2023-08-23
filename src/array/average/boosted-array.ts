import { arrayAverage } from './average';
import { BoostedArray } from '../boosted-array';
import type { ValueGetter } from '../@types';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /**
         * Returns average value of array items or values returned by `valueGetter`
         * @example
         * new BoostedArray(7, 20, 3).average(); // -> 10
         * new BoostedArray({amount: 5}, {amount: 7}, {amount: 12}).average((item) => item.amount); // -> 8
         * */
        average(valueGetter?: ValueGetter<T>): number;
    }
}

BoostedArray.prototype.average = function<T>(this: BoostedArray<T>, valueGetter: ValueGetter<T>) {
    return arrayAverage(this, valueGetter);
}