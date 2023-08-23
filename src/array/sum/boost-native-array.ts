import { arraySum } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        sum(valueGetter?: ValueGetter<T>): number;
    }
}

extendNativeArray(
    'sum',
    function<T>(this: Array<T>, valueGetter?: ValueGetter<T>) {
        return arraySum(this, valueGetter);
    }
);
