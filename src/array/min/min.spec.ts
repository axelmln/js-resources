import { arrayMin } from '.';
import { BoostedArray } from '../boosted-array';
import { MinTester } from './min-tester';

describe('arrayMin', () => {

    const tester = new MinTester(
        (arr, getter) => arrayMin(arr, getter)
    );
    tester.run();
});

describe('BoostedArray.prototype.min', () => {

    const tester = new MinTester(
        (arr, getter) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.min(getter);
        }
    );
    tester.run();
});
