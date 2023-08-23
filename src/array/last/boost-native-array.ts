import { arrayLast } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface Array<T> {
        last(): T;
    }
}

extendNativeArray(
    'last',
    function<T>(this: Array<T>) {
        return arrayLast(this);
    }
);
