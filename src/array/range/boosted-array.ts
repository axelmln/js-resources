import { range } from './range';
import { BoostedArray } from '../boosted-array';

declare module '../boosted-array' {
    export namespace BoostedArray {
        /** Returns an array of numbers from 0, to `stop`, incrementing by 1 */
        function range(stop: number): BoostedArray<number>;
        /** Returns an array of numbers from `start`, to `stop`, incrementing by 1 if `start` < `stop` or -1 otherwise. */
        function range(start: number, stop: number): BoostedArray<number>;
        /**
         * Returns an array of numbers from `start`, to `stop`, incrementing by `step`.  
         * Throws an error if `start` < `stop` and `step` < 0, or if `start` > `stop` and `step` > 0.  
         **/
        function range(start: number, stop: number, step: number): BoostedArray<number>;
    }
}

BoostedArray.range = function(...args: [number]): BoostedArray<number> {
    return new BoostedArray(...range(...args));
}
