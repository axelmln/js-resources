import './boost-native-array';
import { MinTester } from './min-tester';

describe('Array.prototype.min', () => {

    const tester = new MinTester(
        (arr, getter) => arr.min(getter)
    );
    tester.run();
});
