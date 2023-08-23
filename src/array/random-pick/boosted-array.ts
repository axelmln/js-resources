import { arrayRandomPick } from './random-pick';
import { BoostedArray } from '../boosted-array';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Return random item */
        randomPick(): T;
    }
}

BoostedArray.prototype.randomPick = function<T>(this: BoostedArray<T>) {
    return arrayRandomPick(this);
}
