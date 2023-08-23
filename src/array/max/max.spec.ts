import { arrayMax } from '.';
import { BoostedArray } from '../boosted-array';
import { MaxTester } from './max-tester';

describe('arrayMax', () => {

    const tester = new MaxTester(
        (arr, getter) => arrayMax(arr, getter)
    );
    tester.run();
});

describe('BoostedArray.prototype.max', () => {

    const tester = new MaxTester(
        (arr, getter) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.max(getter);
        }
    );
    tester.run();
});
