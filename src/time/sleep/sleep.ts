/** 
 * Returns a promise resolving after given number of `milliseconds`.  
 * Promise resolves to this number of milliseconds.  
 * @example
 * await sleep(1000); // returns 1000 after 1000 milliseconds
 * 
*/
export async function sleep(milliseconds = 0): Promise<number> {
    return new Promise((res) => setTimeout(() => res(milliseconds), milliseconds));
}
