import { arrayRandomPick } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface Array<T> {
        /** Return random item */
        randomPick(): T;
    }
}

extendNativeArray(
    'randomPick',
    function<T>(this: Array<T>) {
        return arrayRandomPick(this);
    }
);
