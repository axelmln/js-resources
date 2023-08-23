import { BoostedArray } from '../boosted-array';
import { asArray } from './as-array';

declare module '../boosted-array' {
    export namespace BoostedArray {
        /** Returns input `value` if it is an array, otherwise returns it wrapped in an array */
        function asArray<T>(value: T): BoostedArray<T extends Array<any> ? T[number] : T>;
    }
}

BoostedArray.asArray = function<T>(value: T) {
    return new BoostedArray(...asArray(value));
}
