import { arrayUniq } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        /** Removes duplicate items from array, based on their value or `valueGetter` return value if provided */
        uniq(valueGetter?: ValueGetter<T>): T[];
    }
}

extendNativeArray(
    'uniq',
    function<T>(this: Array<T>, valueGetter?: ValueGetter<T>) {
        return arrayUniq(this, valueGetter);
    }
);
