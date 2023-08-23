import './boost-native-array';
import { SortAlphaTester } from './sort-alpha-tester';

describe('Array.prototype.sortAlpha', () => {

    const tester = new SortAlphaTester(
        (arr, ...args) => arr.sortAlpha(...args)
    );
    tester.run();
});
