import { arrayGroup } from '.';
import { BoostedArray } from '../boosted-array';
import { GroupTester } from './group-tester';

describe('arrayGroup', () => {

    const tester = new GroupTester(
        (arr, getter) => arrayGroup(arr, getter)

    );
    tester.run();
});

describe('BoostedArray.prototype.group', () => {

    const tester = new GroupTester(
        (arr, getter) => {
            const boostedArray = new BoostedArray(...arr);
            return boostedArray.group(getter);
        }
    );
    tester.run();
});
