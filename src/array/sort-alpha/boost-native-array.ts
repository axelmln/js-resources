import { arraySortAlpha } from '.';
import { extendNativeArray } from '../_common';
import type { SortingOrder, ValueGetter } from '../@types';

declare global {
    interface Array<T> {
        /** Sorts array items alphabetically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided */
        sortAlpha(order?: SortingOrder, valueGetter?: ValueGetter<T>): T[];
    }
}

extendNativeArray(
    'sortAlpha',
    function<T>(this: Array<T>, order?: SortingOrder, valueGetter?: ValueGetter<T>) {
        return arraySortAlpha(this, order, valueGetter);
    }
);
