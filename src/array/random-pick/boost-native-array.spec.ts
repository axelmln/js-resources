import './boost-native-array';
import { RandomPickTester } from './random-pick-tester';

describe('Array.prototype.randomPick', () => {

    const tester = new RandomPickTester(
        (arr) => arr.randomPick()
    );
    tester.run();
});