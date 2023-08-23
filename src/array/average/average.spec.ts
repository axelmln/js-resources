import { arrayAverage } from '.';
import { BoostedArray } from '../boosted-array';
import { AverageTester } from './average-tester';

describe('arrayAverage', () => {

    const tester = new AverageTester(
        (arr, ...args) => arrayAverage(arr, ...args)
    );
    tester.run();
});

describe('BoostedArray.prototype.average', () => {

    const tester = new AverageTester(
        (arr, ...args) => {
            const boostedArr = new BoostedArray(...arr);
            return boostedArr.average(...args);
        }
    );
    tester.run();
});
