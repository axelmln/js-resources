import './boost-native-array';
import { ShuffleTester } from './shuffle-tester';

describe('Array.prototype.shuffle', () => {

    const tester = new ShuffleTester(
        (arr) => arr.shuffle()
    );
    tester.run();
});
