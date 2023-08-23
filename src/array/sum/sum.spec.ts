import { arraySum } from '.';
import { BoostedArray } from '../boosted-array';
import { SumTester } from './sum-tester';

describe('arraySum', () => {

    const tester = new SumTester(
        (arr, ...args) => arraySum(arr, ...args)
    );
    tester.run();
});

describe('BoostedArray.prototype.sum', () => {

    const tester = new SumTester(
        (arr, ...args) => {
            const boostedArr = new BoostedArray(...arr);
            return boostedArr.sum(...args);
        }
    );
    tester.run();
});
