import { arraySortNum } from './sort-num';
import { BoostedArray } from '../boosted-array';
import type { SortingOrder, ValueGetter } from "../@types";

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Sorts array items numerically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided */
        sortNum(sortingOrder?: SortingOrder, valueGetter?: ValueGetter<T>): BoostedArray<T>;
    }
}

BoostedArray.prototype.sortNum = function<T>(this: BoostedArray<T>, order: SortingOrder = 'ascending', valueGetter?: ValueGetter<T>) {
    return new BoostedArray(...arraySortNum(this, order, valueGetter));
}
