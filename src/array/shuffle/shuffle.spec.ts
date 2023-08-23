import { arrayShuffle } from '.';
import { BoostedArray } from '../boosted-array';
import { ShuffleTester } from './shuffle-tester';

describe('arrayShuffle', () => {

    const tester = new ShuffleTester(
        (arr) => arrayShuffle(arr)
    );
    tester.run();
});

describe('BoostedArray.prototype.shuffle', () => {

    const tester = new ShuffleTester(
        (arr) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.shuffle();
        }
    );
    tester.run();
});