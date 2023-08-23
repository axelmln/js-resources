# JS-RESOURCES  

A small set of utility functions and classes.  

## Table of contents  

- [**Array**](#array)
  - [arrayAverage](#arrayaverage)
  - [arrayChunk](#arraychunk)
  - [arrayGroup](#arraygroup)
  - [arrayLast](#arraylast)
  - [arrayMax](#arraymax)
  - [arrayMin](#arraymin)
  - [arrayRandomPick](#arrayrandompick)
  - [arrayShuffle](#arrayshuffle)
  - [arraySortAlpha](#arraysortalpha)
  - [arraySortNum](#arraysortnum)
  - [arraySum](#arraysum)
  - [arrayUniq](#arrayuniq)
  - [asArray](#asarray)
  - [range](#range)
- [**Boolean**](#boolean)
  - [parseBoolean](#parseboolean)
- [**Error**](#error)
  - [withErr](#witherr)
- [**Object**](#object)
  - [defaultProperties](#defaultproperties)
  - [deleteProperties](#deleteproperties)
  - [getProperty](#getproperty)
  - [objectWalk](#objectwalk)
  - [setProperty](#setproperty)
- [**Promise**](#promise)
  - [PromisePool](#promisepool)
- [**Time**](#time)
  - [sleep](#sleep)
  - [withTime](#withtime)

## Array  
 
This package provides a set of utility functions to work with arrays.  
They are all available in 3 forms:  
- As functions:  
    ```ts
    import {
        range,
        arrayChunk,
        arrayShuffle,
        ...
    } from 'js-resources';
    ```
  *Note: functions are prefixed with the word `array` (except the ones provided as static methods in BoostedArray or the boosted native Array [asArray, range])*
- As methods in `BoostedArray` class (a class extending Array):  
    ```ts
    import { BoostedArray } from 'js-resources';
    new BoostedArray(1, 2, 3, 4, 5).chunk(2);
    ```
- As methods in the native Array class, but only if you import the **boost-native-array** module:  
    ```ts
    import 'js-resources/lib/boost-native-array';
    [1, 2, 3, 4, 5].chunk(2);
    ```  

**Only functions are documented here, but signatures are almost identical for the 3 forms (except instance methods do not take an array to process as first parameter and BoostedArray methods return a BoostedArray instance instead of Array).**

### arrayAverage

▸ **arrayAverage**<`T`\>(`array`, `valueGetter?`): `number`

Returns average value of array items or values returned by `valueGetter`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter?` | `ValueGetter`<`T`\> |

#### Returns

`number`

**`Example`**

```ts
arrayAverage([7, 20, 3]); // -> 10
arrayAverage([{amount: 5}, {amount: 7}, {amount: 12}], (item) => item.amount); // -> 8
```

#### Defined in

array/average/average.ts:10

___

### arrayChunk

▸ **arrayChunk**<`T`\>(`array`, `chunksLength?`): `T`[][]

Chunks input `array` in sub arrays of length `chunksLength` (default to 1)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `T`[] | `undefined` |
| `chunksLength` | `number` | `1` |

#### Returns

`T`[][]

**`Example`**

```ts
arrayChunk([1, 2, 3, 4, 5], 3); // -> [[1, 2, 3], [4, 5]]
```

#### Defined in

array/chunk/chunk.ts:6

___

### arrayGroup

▸ **arrayGroup**<`T`\>(`array`, `valueGetter`): `Object`

Groups array items in the property (of the returned object) matching their `valueGetter` return value

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter` | `ValueGetter`<`T`\> |

#### Returns

`Object`

**`Example`**

```ts
arrayGroup([{
     ref: 'foo',
     prop: 'bar',
}, {
     ref: 'fuu',
     prop: 'ber',
}, {
     ref: 'foo',
     prop: 'baz',
}], (item) => item.ref);
// returns:  
// {
//   foo: [{
//       ref: 'foo',
//        prop: 'bar',
//    },{
//        ref: 'foo',
//        prop: 'baz',
//    }],
//    fuu: [{
//        ref: 'fuu',
//        prop: 'ber',
//    }],
// }
```

#### Defined in

array/group/group.ts:33

___

### arrayLast

▸ **arrayLast**<`T`\>(`array`): `undefined` \| `T`

Returns the last item of the array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |

#### Returns

`undefined` \| `T`

**`Example`**

```ts
arrayLast(['foo', 'bar', 'fuu']); // -> 'fuu'
```

#### Defined in

array/last/last.ts:7

___

### arrayMax

▸ **arrayMax**<`T`\>(`array`, `valueGetter?`): `number`

Returns the item with the highest value, or the highest value returned by `valueGetter` if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter?` | `ValueGetter`<`T`\> |

#### Returns

`number`

**`Example`**

```ts
arrayMax([5, 7, 3]); // -> 7
arrayMax([{amount: 5}, {amount: 7}, {amount: 3}], (item) => item.amount); // -> 7
```

#### Defined in

array/max/max.ts:10

___

### arrayMin

▸ **arrayMin**<`T`\>(`array`, `valueGetter?`): `number`

Returns the item with the lowest value, or the lowest value returned by `valueGetter` if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter?` | `ValueGetter`<`T`\> |

#### Returns

`number`

**`Example`**

```ts
arrayMin([5, 3, 7]); // -> 3
arrayMin([{amount: 5}, {amount: 3}, {amount: 7}], (item) => item.amount); // -> 3
```

#### Defined in

array/min/min.ts:10

___

### arrayRandomPick

▸ **arrayRandomPick**<`T`\>(`array`): `undefined` \| `T`

Return random item from array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |

#### Returns

`undefined` \| `T`

**`Example`**

```ts
arrayRandomPick(['foo', 'fuu', 'bar']); // -> who knows???
```

#### Defined in

array/random-pick/random-pick.ts:6

___

### arrayShuffle

▸ **arrayShuffle**<`T`\>(`array`): `T`[]

Returns a copy of the array with items in random order

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |

#### Returns

`T`[]

**`Example`**

```ts
arrayShuffle(['foo', 'bar', 'baz']); // -> [who knows???]
```

#### Defined in

array/shuffle/shuffle.ts:6

___

### arraySortAlpha

▸ **arraySortAlpha**<`T`\>(`array`, `order?`, `valueGetter?`): `T`[]

Sorts array items alphabetically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `T`[] | `undefined` |
| `order` | `SortingOrder` | `'ascending'` |
| `valueGetter?` | `ValueGetter`<`T`\> | `undefined` |

#### Returns

`T`[]

**`Example`**

```ts
arraySortAlpha(['abc', 'bac', 'aaa']); // -> ['aaa', 'abc', 'bac']
arraySortAlpha(['abc', 'bac', 'aaa'], 'descending'); // -> ['bac', 'abc', 'aaa']
const arr = [{
    ref: 'abc',
}, {
    ref: 'bac',
}, {
    ref: 'aaa',
}];
arraySortAlpha(arr, 'descending', (item) => item.ref);
// returns
// [{
//     ref: 'bac',
// }, {
//     ref: 'abc',
// }, {
//     ref: 'aaa',
// }]
```

#### Defined in

array/sort-alpha/sort-alpha.ts:25

___

### arraySortNum

▸ **arraySortNum**<`T`\>(`array`, `order?`, `valueGetter?`): `T`[]

Sorts array items numerically, in ascending (default) or descending `order`, based on their value, or `valueGetter` return value if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `T`[] | `undefined` |
| `order` | `SortingOrder` | `'ascending'` |
| `valueGetter?` | `ValueGetter`<`T`\> | `undefined` |

#### Returns

`T`[]

**`Example`**

```ts
arraySortNum([1, 3, 2, 0, -3]); // -> [-3, 0, 1, 2, 3]
arraySortNum([1, 3, 2, 0, -3], 'descending'); // -> [3, 2, 1, 0, -3]
const arr = [{
    amount: 0,
}, {
    amount: -3,
}, {
    amount: 3,
}];
arraySortNum(arr, 'descending', (item) => item.amount);
// returns
// [{
//     amount: 3,
// }, {
//     amount: 0,
// }, {
//     amount: -3,
// }]
```

#### Defined in

array/sort-num/sort-num.ts:25

___

### arraySum

▸ **arraySum**<`T`\>(`array`, `valueGetter?`): `number`

Returns the sum of the array item values, or `valueGetter` return values if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter?` | `ValueGetter`<`T`\> |

#### Returns

`number`

**`Example`**

```ts
arraySum([5, 7, 3]); // -> 15
const arr = [{
    amount: 5,
}, {
    amount: 7,
}, {
    amount: 3,
}];
arraySum(arr, (item) => item.amount); // -> 15
```

#### Defined in

array/sum/sum.ts:16

___

### arrayUniq

▸ **arrayUniq**<`T`\>(`array`, `valueGetter?`): `T`[]

Returns a copy of the array without duplicate items, based on their value or `valueGetter` return value if provided

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `valueGetter?` | `ValueGetter`<`T`\> |

#### Returns

`T`[]

**`Example`**

```ts
arrayUniq([1, 2, 1, 3, 3, 4, 5]); // -> [1, 2, 3, 4, 5]
const arr = [{
    id: 1,
}, {
    id: 2,
}, {
    id: 1,
}];
arrayUniq(arr, (item) => item.id);
// returns
// [{
//     id: 1,
// }, {
//     id: 2,
// }]
```

#### Defined in

array/uniq/uniq.ts:22

___

### asArray

▸ **asArray**<`T`\>(`value`): `T` extends `any`[] ? `T`[`number`] : `T`[]

Returns input value if it is an array, otherwise returns it wrapped in an array.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T` extends `any`[] ? `T`[`number`] : `T`[]

**`Example`**

```ts
asArray(['foo']); // -> ['foo']
asArray('foo'); // -> ['foo']
```

#### Defined in

array/as-array/as-array.ts:7

___

### range

▸ **range**(`stop`): `number`[]

Returns an array of numbers from 0, to `stop`, incrementing by 1

#### Parameters

| Name | Type |
| :------ | :------ |
| `stop` | `number` |

#### Returns

`number`[]

**`Example`**

```ts
range(5); // -> [0, 1, 2, 3, 4];
const n = 5;
for (const i of range(5)) { ... }
```

#### Defined in

array/range/range.ts:8

▸ **range**(`start`, `stop`): `number`[]

Returns an array of numbers from `start`, to `stop`, incrementing by 1 if `start` < `stop` or -1 otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `stop` | `number` |

#### Returns

`number`[]

**`Example`**

```ts
range(1, 5); // -> [1, 2, 3, 4];
range(5, 1); // -> [5, 4, 3, 2];
```

#### Defined in

array/range/range.ts:15

▸ **range**(`start`, `stop`, `step`): `number`[]

Returns an array of numbers from `start`, to `stop`, incrementing by `step`.  
Throws an error if `start` < `stop` and `step` < 0, or if `start` > `stop` and `step` > 0.

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `stop` | `number` |
| `step` | `number` |

#### Returns

`number`[]

**`Example`**

```ts
range(1, 10, 2); // -> [1, 3, 5, 7, 9];
range(10, 1, -2); // -> [10, 8, 6, 4, 2];
```

#### Defined in

array/range/range.ts:23

___

## Boolean

### parseBoolean

▸ **parseBoolean**(`value`): `boolean`

Takes in a value and returns true if it is true or a stringified true. Returns false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

**`Example`**

```ts
parseBoolean(true); // true
parseBoolean('true'); // true
parseBoolean('True'); // true
parseBoolean(' true'); // true
parseBoolean('foo'); // false
parseBoolean(false); // false
parseBoolean('false'); // false
parseBoolean(0); // false
parseBoolean(1); // false
parseBoolean(null); // false
```

#### Defined in

boolean/parse-boolean/parse-boolean.ts:15


## Error

### withErr

▸ **withErr**<`T`\>(`fn`): `ReturnType`<`T`\> extends `Promise`<infer R\> ? `Promise`<[`R` \| ``null``, `Error` \| ``null``]\> : [`ReturnType`<`T`\> \| ``null``, `Error` \| ``null``]

Returns a tuple containing the return value of input `fn` function (or the resolved value of its returned promise) and null if no error is thrown, otherwise a tuple of null and the thrown error

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `T` |

#### Returns

`ReturnType`<`T`\> extends `Promise`<infer R\> ? `Promise`<[`R` \| ``null``, `Error` \| ``null``]\> : [`ReturnType`<`T`\> \| ``null``, `Error` \| ``null``]

**`Example`**

```ts
const [value, err] = withErr(() => 'foo'); // -> ['foo', null]
const [value, err] = withErr(() => throw new Error('error...')); // -> [null, Error]
const myAsyncFn = async () => {
     // ...
     return 'bar';
};
const [value, err] = await withErr(myAsyncFn); // -> ['bar', null]
const myAsyncThrowingFn = async () => {
     // ...
     throw new Error('error...');
};
const [value, err] = await withErr(myAsyncFn); // -> [null, Error]
```

#### Defined in

error/with-err/with-err.ts:17


## Object

### defaultProperties

▸ **defaultProperties**<`T`\>(`object`, `defaultProperties`): `Partial`<`T`\> & `T`

Returns a copy of input object with specified default properties

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `defaultProperties` | `Partial`<`T`\> |

#### Returns

`Partial`<`T`\> & `T`

**`Example`**

```ts
function foo(options) {
     options = defaultProperties(options, {
         prop1: true,
         prop2: 100,
         ...
     });
}
```

#### Defined in

object/default-properties/default-properties.ts:13

___

### deleteProperties

▸ **deleteProperties**<`T`\>(`object`, `propertiesToDelete`, `options?`): `T`

Returns a copy (unless copy options is set to false) of input object without specified properties

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `propertiesToDelete` | keyof `T`[] |
| `options` | `Object` |
| `options.copyInputObject?` | `boolean` |

#### Returns

`T`

**`Example`**

```ts
const obj = { prop1: 'value1', prop2: 'value2', prop3: 'value3' };
const sanitizedObj = deleteProperties(obj, ['prop1', 'prop3']); // -> { prop2: 'value2' }
console.log(sanitizedObj); // -> { prop2: 'value2' }
console.log(obj); // -> { prop1: 'value1', prop2: 'value2', prop3: 'value3' }
/////////////////////////////////////////////////////////////////////
const obj = { prop1: 'value1', prop2: 'value2', prop3: 'value3' };
deleteProperties(obj, ['prop1', 'prop3'], { copyInputObject: false }); // -> { prop2: 'value2' }
console.log(obj); // -> { prop2: 'value2' }
```

#### Defined in

object/delete-properties/delete-properties.ts:16

___

### getProperty

▸ **getProperty**<`T`\>(`object`, `path`, `fallbackValue`): `any`

Returns `object` property at specified `path`.  
`path` can be a string or an array of valid object keys. Array indexes can also be used.  
If the path does not exists, `fallbackValue` will be returned.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `path` | `string` \| (`string` \| `number` \| `symbol`)[] |
| `fallbackValue` | `any` |

#### Returns

`any`

**`Example`**

```ts
const value = getProperty({
    prop: 'foo',
    nested: {
        nestedProp: 'bar',
    },
}, 'nested.nestedProp'); // -> 'bar'
//////////////////////////////////////
const value = getProperty({ prop: 'foo' }, ['prop2', 'nestedProp'], 'fallback'); // -> 'fallback'
```

#### Defined in

object/get-property/get-property.ts:15

___

### objectWalk

▸ **objectWalk**(`object`, `callback`): `void`

Walks through `object` recursively and triggers `callback` for each of its properties.  
Walking is stopped whenever `callback` returns false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |
| `callback` | (`props`: { `currObject`: `any` ; `key`: `string` \| `number` \| `symbol` ; `level`: `number` ; `path`: (`string` \| `number` \| `symbol`)[] ; `value`: `any`  }) => `undefined` \| `boolean` |

#### Returns

`void`

**`Example`**

```ts
const obj = {
    prop1: {
        prop1_nestedLevel1: {
            prop1_nestedLevel2: {
                prop1_nestedLevel3: 'foo',
            }
        }
    },
    prop2: {
        prop2_nestedLevel1: 'bar',
        prop2_nestedLevel1_bis: {
            prop2_nestedLevel2: 7,
        },
    },
};
const objectWalkReport = [];
objectWalk(obj, ({
    value,
    key,
    currObject,
    level,
    path,
}) => {
    objectWalkReport.push({
        value,
        key,
        currObject,
        level,
        path,
    });
});
console.log(objectWalkReport);
// Logs:
// [{
//     value: obj.prop1,
//     key: 'prop1',
//     currObject: obj,
//     level: 0,
//     path: ['prop1'],
// }, {
//     value: obj.prop1.prop1_nestedLevel1,
//     key: 'prop1_nestedLevel1',
//     currObject: obj.prop1,
//     level: 1,
//     path: ['prop1', 'prop1_nestedLevel1'],
// }, {
//     value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
//     key: 'prop1_nestedLevel2',
//     currObject: obj.prop1.prop1_nestedLevel1,
//     level: 2,
//     path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2'],
// }, {
//     value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2.prop1_nestedLevel3,
//     key: 'prop1_nestedLevel3',
//     currObject: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
//     level: 3,
//     path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2', 'prop1_nestedLevel3'],
// }, {
//     value: obj.prop2,
//     key: 'prop2',
//     currObject: obj,
//     level: 0,
//     path: ['prop2'],
// }, {
//     value: obj.prop2.prop2_nestedLevel1,
//     key: 'prop2_nestedLevel1',
//     currObject: obj.prop2,
//     level: 1,
//     path: ['prop2', 'prop2_nestedLevel1'],
// }, {
//     value: obj.prop2.prop2_nestedLevel1_bis,
//     key: 'prop2_nestedLevel1_bis',
//     currObject: obj.prop2,
//     level: 1,
//     path: ['prop2', 'prop2_nestedLevel1_bis'],
// }, {
//     value: obj.prop2.prop2_nestedLevel1_bis.prop2_nestedLevel2,
//     key: 'prop2_nestedLevel2',
//     currObject: obj.prop2.prop2_nestedLevel1_bis,
//     level: 2,
//     path: ['prop2', 'prop2_nestedLevel1_bis', 'prop2_nestedLevel2'],
// }]
```

#### Defined in

object/walk/walk.ts:97

___

### setProperty

▸ **setProperty**<`T`\>(`object`, `path`, `value`): `void`

Sets `object` property at specified `path` with specified `value`.  
`path` can be a string or an array of valid object keys. Array indexes can also be used.  
Non existing properties will be created.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `path` | `string` \| (`string` \| `number` \| `symbol`)[] |
| `value` | `any` |

#### Returns

`void`

**`Example`**

```ts
const obj = { prop: 'foo' };
setProperty(obj, 'prop', 'bar');
console.log(obj): // -> { prop: 'bar' }
setProperty(obj, ['newProp', 'nested'], 'fuu');
console.log(obj): // -> { prop: 'bar', newProp: { nested: 'fuu' } }
```

#### Defined in

object/set-property/set-property.ts:12


## Promise

# Class: PromisePool

A simple Promise pool to handle concurrency

**`Example`**

```ts
const pool = new PromisePool()
     .setConcurrency(3)
     .onTaskDone((result) => console.log(result));
const results = await pool.run([
     asyncFn,
     asyncFn,
     asyncFn,
     asyncFn,
     asyncFn,
]);
/////////////////////////////////////////////////
const pool = new PromisePool(2)
     .setTaskMapper((value) => {
         // async stuffs...
     }) // -> Used to tranform 'tasks' passed in `run` method
     .onTaskDone((_, index, nbTasks) => console.log(Math.round((index + 1) / nbTasks * 100)), '%');
const results = await pool.run([
     {ref: 'foo'},
     {ref: 'fuu'},
     {ref: 'bar'},
     {ref: 'baz'},
]);
/////////////////////////////////////////////////
const pool = new PromisePool(1);
(async function fn1() {
     const result = await pool.run(asyncFn);
})();
(async function fn2() {
     const result = await pool.run(asyncFn); // -> Won't be triggered before fn1 run ends
})();
```

## Table of contents

### Constructors

- [constructor](PromisePool.md#constructor)

### Methods

- [onTaskDone](PromisePool.md#ontaskdone)
- [pause](PromisePool.md#pause)
- [resume](PromisePool.md#resume)
- [run](PromisePool.md#run)
- [setConcurrency](PromisePool.md#setconcurrency)
- [setTaskFilter](PromisePool.md#settaskfilter)
- [setTaskMapper](PromisePool.md#settaskmapper)

## Constructors

### constructor

• **new PromisePool**(`concurrency?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `concurrency` | `number` | `5` | Must be between 0 (paused) and Infinity (no limit). Default is 5. |

#### Defined in

promise/pool/pool.ts:45

## Methods

### onTaskDone

▸ **onTaskDone**<`T`\>(`callback`): [`PromisePool`](PromisePool.md)

Registers a function to be called a tasks is finished.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `OnTaskDoneCallback`<`T`\> |

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:170

___

### pause

▸ **pause**(): [`PromisePool`](PromisePool.md)

Stops processing tasks by setting concurrency to 0.

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:136

___

### resume

▸ **resume**(): [`PromisePool`](PromisePool.md)

Resumes tasks processing by setting concurrency to its previous value.

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:145

___

### run

▸ **run**<`T`\>(`tasks`): `Promise`<`T`\>

Runs provided `tasks` according to PromisePool instance settings.  
`tasks` can be an array or a single job, and each of them can be a function or any other type.  
If an array is provided, an array of results will be returned.  
Otherwise, the result of the single task will be returned.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | `any` |

#### Returns

`Promise`<`T`\>

#### Defined in

promise/pool/pool.ts:181

___

### setConcurrency

▸ **setConcurrency**(`concurrency`): [`PromisePool`](PromisePool.md)

Sets concurrency with the provided number.  
Must be between 0 (paused) and Infinity (no limit). Default is 5.

#### Parameters

| Name | Type |
| :------ | :------ |
| `concurrency` | `number` |

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:127

___

### setTaskFilter

▸ **setTaskFilter**<`T`\>(`predicate`): [`PromisePool`](PromisePool.md)

A function that will be called on each task.  
A task is removed if the `callback` return value is falsy.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | `TaskFilterPredicate`<`T`\> |

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:154

___

### setTaskMapper

▸ **setTaskMapper**<`T`\>(`callback`): [`PromisePool`](PromisePool.md)

Set a mapper function that will be called on each task. Each of them will be tranformed according to the `callback` return value.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `TaskMapperCallback`<`T`\> |

#### Returns

[`PromisePool`](PromisePool.md)

#### Defined in

promise/pool/pool.ts:162


## Time

### sleep

▸ **sleep**(`milliseconds?`): `Promise`<`number`\>

Returns a promise resolving after given number of `milliseconds`.  
Promise resolves to this number of milliseconds.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `milliseconds` | `number` | `0` |

#### Returns

`Promise`<`number`\>

**`Example`**

```ts
await sleep(1000); // returns 1000 after 1000 milliseconds
```

#### Defined in

time/sleep/sleep.ts:8

___

### withTime

▸ **withTime**<`T`\>(`fn`): `ReturnType`<`T`\> extends `Promise`<infer R\> ? `Promise`<[`R`, `number`]\> : [`ReturnType`<`T`\>, `number`]

Returns a tuple containing the return value of input `fn` function (or the resolved value of its returned promise) and the time (in milliseconds) it took to complete

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `T` |

#### Returns

`ReturnType`<`T`\> extends `Promise`<infer R\> ? `Promise`<[`R`, `number`]\> : [`ReturnType`<`T`\>, `number`]

**`Example`**

```ts
const [value, time] = withTime(() => 'foo'); // -> ['foo', 1]
const myAsyncFn = async () => {
     await new Promise((res) => setTimeout(res, 3000));
     return 'bar';
};
const [value, time] = await withTime(myAsyncFn); // -> ['bar', 3007]
```

#### Defined in

time/with-time/with-time.ts:11

