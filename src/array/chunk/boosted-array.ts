import { BoostedArray } from '../boosted-array';
import { arrayChunk } from './chunk';

declare module '../boosted-array' {
    interface BoostedArray<T> {
        /** Chunks array in sub arrays of length `chunksLength` */
        chunk(chunksLength?: number): BoostedArray<BoostedArray<T>>;
    }
}

BoostedArray.prototype.chunk = function<T>(this: BoostedArray<T>, chunksLength: number) {
    return new BoostedArray(
        ...<BoostedArray<T>[]>arrayChunk(this, chunksLength)
    );
};