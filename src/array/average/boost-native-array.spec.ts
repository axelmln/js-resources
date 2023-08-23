import './boost-native-array';
import { AverageTester } from './average-tester';

describe('Array.prototype.average', () => {

    const tester = new AverageTester(
        (arr, ...args) => arr.average(...args)
    );
    tester.run();
});