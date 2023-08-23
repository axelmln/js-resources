/**
 * Returns an array of numbers from 0, to `stop`, incrementing by 1
 * @example
 * range(5); // -> [0, 1, 2, 3, 4];
 * const n = 5;
 * for (const i of range(5)) { ... }
 **/
export function range(stop: number): number[];
/**
 * Returns an array of numbers from `start`, to `stop`, incrementing by 1 if `start` < `stop` or -1 otherwise.
 * @example
 * range(1, 5); // -> [1, 2, 3, 4];
 * range(5, 1); // -> [5, 4, 3, 2];
 **/
export function range(start: number, stop: number): number[];
/**
 * Returns an array of numbers from `start`, to `stop`, incrementing by `step`.  
 * Throws an error if `start` < `stop` and `step` < 0, or if `start` > `stop` and `step` > 0.  
 * @example
 * range(1, 10, 2); // -> [1, 3, 5, 7, 9];
 * range(10, 1, -2); // -> [10, 8, 6, 4, 2];
 **/
export function range(start: number, stop: number, step: number): number[];
export function range(start: number, stop?: number, step?: number): number[] {
    stop ?? ([start, stop] = [0, start]);
    step = step || (start > stop ? -1 : 1);
    const isIncorrectRange = step > 0 ? start > stop : start < stop;
    if (isIncorrectRange) {
        throw new Error(
            `Invalid range {start: ${start}, stop: ${stop}, step: ${step}}.
            start must not be superior to stop if step is an increment, and stop must not be superior to start if step is a decrement.`
        );
    }

    const rangeArray = [];
    const canContinue = (i: number) => (stop as number) > start
        ? i < (stop as number)
        : i > (stop as number);
    let i = start;
    while (canContinue(i)) {
        rangeArray.push(i);
        i += step;
    }
    return rangeArray;
}
