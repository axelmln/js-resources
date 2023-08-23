import { asArray } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface ArrayConstructor {
        /** Returns input `value` if it is an array, otherwise returns it wrapped in an array */
        asArray<T>(value: T): Array<T extends Array<any> ? T[number] : T>;
    }
}

extendNativeArray(
    'asArray',
    function<T>(value: T) {
        return asArray(value);
    },
    true
);
