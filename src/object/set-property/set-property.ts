/**
 * Sets `object` property at specified `path` with specified `value`.  
 * `path` can be a string or an array of valid object keys. Array indexes can also be used.  
 * Non existing properties will be created.  
 * @example
 * const obj = { prop: 'foo' };
 * setProperty(obj, 'prop', 'bar');
 * console.log(obj): // -> { prop: 'bar' }
 * setProperty(obj, ['newProp', 'nested'], 'fuu');
 * console.log(obj): // -> { prop: 'bar', newProp: { nested: 'fuu' } }
 */
export function setProperty<T>(
    object: T,
    path: string | (string | number | symbol)[],
    value: any
): void {
    if (typeof path === 'string') path = path.split('.');

    let currValue: any = object;
    for (const [i, key] of path.entries()) {
        const isLastIter = i + 1 === path.length;
        if (isLastIter) return currValue[key] = value;
        const isNotObject = typeof currValue[key] !== 'object' || currValue[key] === null;
        if (!(key in currValue)) {
            const isNextKeyNumber = isNaN(parseInt(<any>path[i+1], 10));
            currValue[key] = isNextKeyNumber ? {} : [];
        } else if (isNotObject) break;
        currValue = currValue[key];
    }
}
