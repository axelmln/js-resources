import './boost-native-array';
import { UniqTester } from './uniq-tester';


describe('Array.prototype.uniq', () => {

    const tester = new UniqTester(
        (arr, getter) => arr.uniq(getter)
    );
    tester.run();
});