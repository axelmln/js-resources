import { arraySortAlpha } from '.';
import { BoostedArray } from '../boosted-array';
import { SortAlphaTester } from './sort-alpha-tester';

describe('arraySortAlpha', () => {

    const tester = new SortAlphaTester(
        (arr, ...args) => arraySortAlpha(arr, ...args)
    );
    tester.run();
});

describe('BoostedArray.prototype.sortAlpha', () => {

    const tester = new SortAlphaTester(
        (arr, ...args) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.sortAlpha(...args);
        }
    );
    tester.run();
});