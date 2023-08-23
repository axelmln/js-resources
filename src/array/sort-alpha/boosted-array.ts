import { arraySortAlpha } from './sort-alpha';
import { BoostedArray } from '../boosted-array';
import type { SortingOrder, ValueGetter } from "../@types";

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Sorts array items alphabetically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided */
        sortAlpha(sortingOrder?: SortingOrder, valueGetter?: ValueGetter<T>): BoostedArray<T>;
    }
}

BoostedArray.prototype.sortAlpha = function<T>(this: BoostedArray<T>, order: SortingOrder = 'ascending', valueGetter?: ValueGetter<T>) {
    return new BoostedArray(...arraySortAlpha(this, order, valueGetter));
}
