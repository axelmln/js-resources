export function isPlainObject(value: any) {
    return !!value && [undefined, Object].includes(value.constructor);
}
