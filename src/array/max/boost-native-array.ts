import { arrayMax } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        max(valueGetter?: ValueGetter<T>): number;
    }
}

extendNativeArray(
    'max',
    function<T>(this: Array<T>, valueGetter?: ValueGetter<T>) {
        return arrayMax(this, valueGetter);
    }
);
