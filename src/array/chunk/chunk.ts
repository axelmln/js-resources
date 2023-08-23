/**
 * Chunks input `array` in sub arrays of length `chunksLength`  
 * @example
 * arrayChunk([1, 2, 3, 4, 5], 3); // -> [[1, 2, 3], [4, 5]]
 * */
export function arrayChunk<T>(array: Array<T>, chunksLength: number) {
    const parts = Math.ceil(array.length / chunksLength);

    const chunks = [];
    for (let p = 0; p < parts; p++) {
        chunks.push(
            array.slice(p*chunksLength, (p+1)*chunksLength)
        );
    }

    return chunks;
}
