/**
 * Returns a tuple containing the return value of input `fn` function (or the resolved value of its returned promise) and null if no error is thrown, otherwise a tuple of null and the thrown error
 * @example
 * const [value, err] = withErr(() => 'foo'); // -> ['foo', null]
 * const [value, err] = withErr(() => throw new Error('error...')); // -> [null, Error]
 * const myAsyncFn = async () => {
 *      // ...
 *      return 'bar';
 * };
 * const [value, err] = await withErr(myAsyncFn); // -> ['bar', null]
 * const myAsyncThrowingFn = async () => {
 *      // ...
 *      throw new Error('error...');
 * };
 * const [value, err] = await withErr(myAsyncFn); // -> [null, Error]
 **/
export function withErr<T extends (...args: any[]) => any>(fn: T): ReturnType<T> extends Promise<infer R> ? Promise<[R | null, Error | null]> : [ReturnType<T> | null,  Error | null] {
    try {
        const result = fn();
        if (result instanceof Promise) return result
            .then((res) => [res, null])
            .catch((err) => [null, err]) as any;
        return [result, null] as any;
    } catch(err) {
        return [null, err] as any;
    }
}
