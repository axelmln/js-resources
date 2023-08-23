import { ChunkTester } from './chunk-tester';
import './boost-native-array';

describe('Array.prototype.chunk', () => {

    const tester = new ChunkTester(
        (arr, ...args) => arr.chunk(...args)
    );
    tester.run();
});
