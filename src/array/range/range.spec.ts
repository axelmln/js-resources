import { range } from '.';
import { BoostedArray } from '../boosted-array';
import { RangeTester } from './range-tester';

describe('range', () => {

    const tester = new RangeTester(
        (...args) => range(...<[number]>args)
    );
    tester.run();
});

describe('BoostedArray.range', () => {
    const tester = new RangeTester(
        (...args) => BoostedArray.range(...<[number]>args)
    );
    tester.run();
});
