import { arrayGroup } from '.';
import { extendNativeArray } from '../_common';
import type { ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        /** Groups items in the property (of the returned object) matching their `valueGetter` return value */
        group(valueGetter: ValueGetter<T>): { [key: string]: T[] };
    }
}

extendNativeArray(
    'group',
    function<T>(this: Array<T>, valueGetter: ValueGetter<T>) {
        return arrayGroup(this, valueGetter);
    }
);
