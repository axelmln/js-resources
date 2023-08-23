import { arrayChunk } from '.';
import { BoostedArray } from '../boosted-array';
import { ChunkTester } from './chunk-tester';

describe('arrayChunk', () => {

    const tester = new ChunkTester(
        (arr, ...args) => arrayChunk(arr, ...args)
    );
    tester.run();
});

describe('BoostedArray.prototype.chunk', () => {

    const tester = new ChunkTester(
        (arr, ...args) => {
            const boostedArr = new BoostedArray(...arr);
            return boostedArr.chunk(...args);
        }
    );
    tester.run();
});
