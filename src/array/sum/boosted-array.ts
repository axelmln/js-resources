import { arraySum } from './sum';
import { BoostedArray } from '../boosted-array';
import type { ValueGetter } from "../@types";

declare module '../boosted-array' {
    interface BoostedArray<T> {
        sum(valueGetter?: ValueGetter<T>): number;
    }
}

BoostedArray.prototype.sum = function<T>(this: BoostedArray<T>, valueGetter: ValueGetter<T>) {
    return arraySum(this, valueGetter);
}
