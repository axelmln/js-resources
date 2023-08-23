import { arrayLast } from './last';
import { BoostedArray } from '../boosted-array';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        last(): T;
    }
}

BoostedArray.prototype.last = function<T>(this: BoostedArray<T>) {
    return arrayLast(this);
}