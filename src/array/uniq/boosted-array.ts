import { arrayUniq } from './uniq';
import { BoostedArray } from '../boosted-array';
import type { ValueGetter } from '../@types';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Removes duplicate items from array, based on their value or `valueGetter` return value if provided */
        uniq(valueGetter?: ValueGetter<T>): BoostedArray<T>;
    }
}

BoostedArray.prototype.uniq = function<T>(this: BoostedArray<T>, valueGetter?: ValueGetter<T>) {
    return new BoostedArray(...arrayUniq(this, valueGetter));
}
