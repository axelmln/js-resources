import { BoostedArray } from '../boosted-array';
import { arrayGroup } from './group';
import type { ValueGetter } from '../@types';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Groups items in the property (of the returned object) matching their `valueGetter` return value */
        group(valueGetter: ValueGetter<T>): { [key: string]: BoostedArray<T> };
    }
}

BoostedArray.prototype.group = function<T>(this: BoostedArray<T>, valueGetter: ValueGetter<T>) {
    return arrayGroup(this, valueGetter);
}