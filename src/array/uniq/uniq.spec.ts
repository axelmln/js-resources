import { arrayUniq } from '.';
import { BoostedArray } from '../boosted-array';
import { UniqTester } from './uniq-tester';

describe('arrayUniq', () => {

    const tester = new UniqTester(
        (arr, getter) => arrayUniq(arr, getter)
    );
    tester.run();
});

describe('BoostedArray.prototype.uniq', () => {

    const tester = new UniqTester(
        (arr, getter) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.uniq(getter);
        }
    );
    tester.run();
});
