import { defaultProperties } from '../default-properties';

/**
 * 
 * Returns a copy (unless copy options is set to false) of input object without specified properties
 * @example
 * const obj = { prop1: 'value1', prop2: 'value2', prop3: 'value3' };
 * const sanitizedObj = deleteProperties(obj, ['prop1', 'prop3']); // -> { prop2: 'value2' }
 * console.log(sanitizedObj); // -> { prop2: 'value2' }
 * console.log(obj); // -> { prop1: 'value1', prop2: 'value2', prop3: 'value3' }
 * /////////////////////////////////////////////////////////////////////
 * const obj = { prop1: 'value1', prop2: 'value2', prop3: 'value3' };
 * deleteProperties(obj, ['prop1', 'prop3'], { copyInputObject: false }); // -> { prop2: 'value2' }
 * console.log(obj); // -> { prop2: 'value2' }
 */
export function deleteProperties<T>(object: T, propertiesToDelete: (keyof T)[], options: {
    copyInputObject?: boolean;
} = {}) {
    options = defaultProperties(options, {
        copyInputObject: true,
    });
    if (options.copyInputObject) object = { ...object };

    for (const field of propertiesToDelete) {
        delete object[field];
    }

    return object;
}
