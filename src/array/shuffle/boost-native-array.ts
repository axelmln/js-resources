import { arrayShuffle } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface Array<T> {
        /** Randomize array items order */
        shuffle(): T[];
    }
}

extendNativeArray(
    'shuffle',
    function<T>(this: Array<T>) {
        return arrayShuffle(this);
    }
);
