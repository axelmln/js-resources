import './boost-native-array';
import { SumTester } from './sum-tester';

describe('Array.prototype.sum', () => {

    const tester = new SumTester(
        (arr, ...args) => arr.sum(...args)
    );
    tester.run();
});