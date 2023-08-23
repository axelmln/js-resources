/**
 * Returns a tuple containing the return value of input `fn` function (or the resolved value of its returned promise) and the time (in milliseconds) it took to complete
 * @example
 * const [value, time] = withTime(() => 'foo'); // -> ['foo', 1]
 * const myAsyncFn = async () => {
 *      await new Promise((res) => setTimeout(res, 3000));
 *      return 'bar';
 * };
 * const [value, time] = await withTime(myAsyncFn); // -> ['bar', 3007]
 **/
export function withTime<T extends(...args: any[]) => any>(fn: T): ReturnType<T> extends Promise<infer R> ? Promise<[R, number]> : [ReturnType<T>,  number] {
    const start = Date.now();
    const result = fn();
    const toReturn = (res = result) => [
        res,
        Date.now() - start,
    ];
    if (result instanceof Promise) return result.then((res) => toReturn(res)) as any;
    return toReturn() as any;
}
