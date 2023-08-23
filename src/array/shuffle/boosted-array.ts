import { arrayShuffle } from './shuffle';
import { BoostedArray } from '../boosted-array';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Randomize array items order */
        shuffle(): BoostedArray<T>;
    }
}

BoostedArray.prototype.shuffle = function<T>(this: BoostedArray<T>) {
    return new BoostedArray(...arrayShuffle(this));
}
