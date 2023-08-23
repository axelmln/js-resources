import { arraySortNum } from '.';
import { BoostedArray } from '../boosted-array';
import { SortNumTester } from './sort-num-tester';

describe('arraySortNum', () => {

    const tester = new SortNumTester(
        (arr, ...args) => arraySortNum(arr, ...args)
    );
    tester.run();
});

describe('BoostedArray.prototype.sortNum', () => {

    const tester = new SortNumTester(
        (arr, ...args) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.sortNum(...args);
        }
    );
    tester.run();
});
