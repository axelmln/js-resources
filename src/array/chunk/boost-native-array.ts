import { arrayChunk } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface Array<T> {
        /** Chunks array in sub arrays of length `chunksLength`*/
        chunk(chunkLength?: number): T[][];
    }
}

extendNativeArray(
    'chunk',
    function<T>(this: Array<T>, chunkLength: number) {
        return arrayChunk(this, chunkLength);
    }
);
