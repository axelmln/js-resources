import { arrayLast } from '.';
import { BoostedArray } from '../boosted-array';
import { LastTester } from './last-tester';

describe('arrayLast', () => {

    const tester = new LastTester(
        (arr) => arrayLast(arr)
    );
    tester.run();
});

describe('BoostedArray.prototype.last', () => {

    const tester = new LastTester(
        (arr) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.last();
        }
    );
    tester.run();
});
