import { range } from '.';
import { extendNativeArray } from '../_common';

declare global {
    interface ArrayConstructor {
        /** Returns an array of numbers from 0, to `stop`, incrementing by 1 */
        range(stop: number): number[];
        /** Returns an array of numbers from `start`, to `stop`, incrementing by 1 if `start` < `stop` or -1 otherwise. */
        range(start: number, stop: number): number[];
        /**
         * Returns an array of numbers from `start`, to `stop`, incrementing by `step`.  
         * Throws an error if `start` < `stop` and `step` < 0, or if `start` > `stop` and `step` > 0.  
         **/
        range(start: number, stop: number, step: number): number[];
    }
}

extendNativeArray(
    'range',
    function(...args: [number]) {
        return range(...args);
    },
    true
);
