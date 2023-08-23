/**
 * Takes in a value and returns true if it is true or a stringified true. Returns false otherwise.  
 * @example
 * parseBoolean(true); // true
 * parseBoolean('true'); // true
 * parseBoolean('True'); // true
 * parseBoolean(' true'); // true
 * parseBoolean('foo'); // false
 * parseBoolean(false); // false
 * parseBoolean('false'); // false
 * parseBoolean(0); // false
 * parseBoolean(1); // false
 * parseBoolean(null); // false
 */
export function parseBoolean(value: any) {
    return (''+value).trim().toLowerCase() === 'true';
}
