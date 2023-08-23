import { arrayMin } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        min(valueGetter?: ValueGetter<T>): number;
    }
}

extendNativeArray(
    'min',
    function<T>(this: Array<T>, valueGetter?: ValueGetter<T>) {
        return arrayMin(this, valueGetter);
    }
);
