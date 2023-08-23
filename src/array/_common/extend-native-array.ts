export function extendNativeArray(name: string, value: any, isStatic = false) {
    Object.defineProperty(
        isStatic ? Array : Array.prototype,
        name,
        {
            value,
            enumerable: false,
            writable: true,
            configurable: true,
        }
    );
}
