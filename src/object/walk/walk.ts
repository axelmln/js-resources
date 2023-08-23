import { isPlainObject } from '../_common';

type StackItem = {
    value: any;
    key: string | number | symbol,
    currObject: any;
    path: (string | number | symbol)[];
};

/** 
 * Walks through `object` recursively and triggers `callback` for each of its properties.  
 * Walking is stopped whenever `callback` returns false.
 * @example
 * const obj = {
 *     prop1: {
 *         prop1_nestedLevel1: {
 *             prop1_nestedLevel2: {
 *                 prop1_nestedLevel3: 'foo',
 *             }
 *         }
 *     },
 *     prop2: {
 *         prop2_nestedLevel1: 'bar',
 *         prop2_nestedLevel1_bis: {
 *             prop2_nestedLevel2: 7,
 *         },
 *     },
 * };
 * const objectWalkReport = [];
 * objectWalk(obj, ({
 *     value,
 *     key,
 *     currObject,
 *     level,
 *     path,
 * }) => {
 *     objectWalkReport.push({
 *         value,
 *         key,
 *         currObject,
 *         level,
 *         path,
 *     });
 * });
 * console.log(objectWalkReport);
 * // Logs:
 * // [{
 * //     value: obj.prop1,
 * //     key: 'prop1',
 * //     currObject: obj,
 * //     level: 0,
 * //     path: ['prop1'],
 * // }, {
 * //     value: obj.prop1.prop1_nestedLevel1,
 * //     key: 'prop1_nestedLevel1',
 * //     currObject: obj.prop1,
 * //     level: 1,
 * //     path: ['prop1', 'prop1_nestedLevel1'],
 * // }, {
 * //     value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
 * //     key: 'prop1_nestedLevel2',
 * //     currObject: obj.prop1.prop1_nestedLevel1,
 * //     level: 2,
 * //     path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2'],
 * // }, {
 * //     value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2.prop1_nestedLevel3,
 * //     key: 'prop1_nestedLevel3',
 * //     currObject: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
 * //     level: 3,
 * //     path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2', 'prop1_nestedLevel3'],
 * // }, {
 * //     value: obj.prop2,
 * //     key: 'prop2',
 * //     currObject: obj,
 * //     level: 0,
 * //     path: ['prop2'],
 * // }, {
 * //     value: obj.prop2.prop2_nestedLevel1,
 * //     key: 'prop2_nestedLevel1',
 * //     currObject: obj.prop2,
 * //     level: 1,
 * //     path: ['prop2', 'prop2_nestedLevel1'],
 * // }, {
 * //     value: obj.prop2.prop2_nestedLevel1_bis,
 * //     key: 'prop2_nestedLevel1_bis',
 * //     currObject: obj.prop2,
 * //     level: 1,
 * //     path: ['prop2', 'prop2_nestedLevel1_bis'],
 * // }, {
 * //     value: obj.prop2.prop2_nestedLevel1_bis.prop2_nestedLevel2,
 * //     key: 'prop2_nestedLevel2',
 * //     currObject: obj.prop2.prop2_nestedLevel1_bis,
 * //     level: 2,
 * //     path: ['prop2', 'prop2_nestedLevel1_bis', 'prop2_nestedLevel2'],
 * // }]
 */
export function objectWalk(object: any, callback: (props: {
    value: any,
    key: string | number | symbol,
    currObject: any,
    /** Zero based nesting depth index */
    level: number,
    /** Array of properties leading to current value */
    path: (string | number | symbol)[],
}) => boolean | undefined) {

    let stack: StackItem[] = Object
        .entries(object)
        .map(([key, value]) => ({
            value,
            key,
            currObject: object,
            path: [key],
        }));

    const scanner = (stackItem: StackItem) => {
        const cbReturn = callback({
            value: stackItem.value,
            key: stackItem.key,
            currObject: stackItem.currObject,
            level: stackItem.path.length - 1,
            path: stackItem.path,
        });
        if (cbReturn === false) return stack.length = 0;

        stack.shift();
        if (!isPlainObject(stackItem.value) && !Array.isArray(stackItem.value)) return;

        const toProcessNext: StackItem[] = [];
        for (const key in stackItem.value) {
            toProcessNext.push({
                value: stackItem.value[key],
                key,
                currObject: stackItem.value,
                path: [...stackItem.path, key],
            });
        }
        stack = [...toProcessNext, ...stack];
    };

    while (stack[0]) {
        scanner(stack[0]);
    }
}
