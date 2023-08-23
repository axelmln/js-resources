import './boost-native-array';
import { LastTester } from './last-tester';

describe('Array.prototype.last', () => {

    const tester = new LastTester(
        (arr) => arr.last()
    );
    tester.run();
});
