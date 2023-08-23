import './boost-native-array';
import { RangeTester } from './range-tester';

describe('Array.range', () => {

    const tester = new RangeTester(
        (...args) => Array.range(...<[number]>args)
    );
    tester.run();
});