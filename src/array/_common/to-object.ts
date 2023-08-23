type TransformerFunction<T> = (objectToGenerate: any, value: T, index: number, array: T[]) => void;

export function toObject<T>(array: T[], transformerFunction: TransformerFunction<T>) {
    const objectToGenerate = {};
    array.forEach((value, index, array) => transformerFunction(objectToGenerate, value, index, array));

    return objectToGenerate;
}
