import './boost-native-array';
import { GroupTester } from './group-tester';

describe('Array.prototype.group', () => {

    const tester = new GroupTester(
        (arr, getter) => arr.group(getter)
    );
    tester.run();
});
