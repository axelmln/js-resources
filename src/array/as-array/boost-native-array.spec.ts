import './boost-native-array';
import { AsArrayTester } from './as-array-tester';

describe('Array.asArray', () => {

    const tester = new AsArrayTester(
        (value) => Array.asArray(value)
    );
    tester.run();
});