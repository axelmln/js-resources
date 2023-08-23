import { arrayRandomPick } from '.';
import { BoostedArray } from '../boosted-array';
import { RandomPickTester } from './random-pick-tester';

describe('arrayRandomPick', () => {

    const tester = new RandomPickTester(
        (arr) => arrayRandomPick(arr)
    );
    tester.run();
});

describe('BoostedArray.prototype.randomPick', () => {

    const tester = new RandomPickTester(
        (arr) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.randomPick();
        }
    );
    tester.run();
});
