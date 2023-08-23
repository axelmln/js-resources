/**
 * Returns a copy of the array with items in random order
 * @example
 * arrayShuffle(['foo', 'bar', 'baz']); // -> [who knows???]
 * */
export function arrayShuffle<T>(array: Array<T>) { 
    const shuffledArray = [...array];
    let i = shuffledArray.length;
    while (i > 0) {
        const randomIndex = Math.floor(Math.random() * i);
        i--;
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
}