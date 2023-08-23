/**
 * Return random item from array
 * @example
 * arrayRandomPick(['foo', 'fuu', 'bar']); // -> who knows???
 * */
export function arrayRandomPick<T>(array: Array<T>) {
    if (!array?.length) return;
    const randomIndex = Math.floor(
        Math.random() * array.length
    );
    return array[randomIndex];
}
