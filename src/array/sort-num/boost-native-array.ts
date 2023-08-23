import { arraySortNum } from '.';
import { extendNativeArray } from '../_common';
import type { SortingOrder, ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        /** Sorts array items numerically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided */
        sortNum(order?: SortingOrder, valueGetter?: ValueGetter<T>): T[];
    }
}

extendNativeArray(
    'sortNum',
    function<T>(this: Array<T>, order?: SortingOrder, valueGetter?: ValueGetter<T>) {
        return arraySortNum(this, order, valueGetter);
    }
);
