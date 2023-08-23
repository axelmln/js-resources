import './boost-native-array';
import { MaxTester } from './max-tester';

describe('Array.prototype.max', () => {

    const tester = new MaxTester(
        (arr, getter) => arr.max(getter)
    );
    tester.run();
});
