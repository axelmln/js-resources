import { arrayMin } from './min';
import { BoostedArray } from '../boosted-array';
import type { ValueGetter } from '../@types';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        min(valueGetter?: ValueGetter<T>): number;
    }
}

BoostedArray.prototype.min = function<T>(this: BoostedArray<T>, valueGetter: ValueGetter<T>) {
    return arrayMin(this, valueGetter);
}
