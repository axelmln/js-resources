import { asArray } from '.';
import { BoostedArray } from '../boosted-array';
import { AsArrayTester } from './as-array-tester';

describe('asArray', () => {

    const tester = new AsArrayTester(
        (value) => asArray(value)
    );
    tester.run();
});

describe('BoostedArray.asArray', () => {

    const tester = new AsArrayTester(
        (value) => BoostedArray.asArray(value)
    );
    tester.run();
});
