import './boost-native-array';
import { SortNumTester } from './sort-num-tester';

describe('Array.prototype.sortNum', () => {

    const tester = new SortNumTester(
        (arr, ...args) => arr.sortNum(...args)
    );
    tester.run();
});