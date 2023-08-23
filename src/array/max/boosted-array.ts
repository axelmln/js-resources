import { arrayMax } from './max';
import { BoostedArray } from '../boosted-array';
import type { ValueGetter } from '../@types';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        max(valueGetter?: ValueGetter<T>): number;
    }
}

BoostedArray.prototype.max = function<T>(this: BoostedArray<T>, valueGetter: ValueGetter<T>) {
    return arrayMax(this, valueGetter);
}