import { range } from '../range';
import { arrayUniq } from '../uniq';

export class ShuffleTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should not be same array after shuffling', () => {
            console.time('range');
            const arr = range(1000);
            const shuffled = this.toBeTested(arr);
            expect(shuffled).not.toEqual(arr);
            // Health checks
            expect(arrayUniq(shuffled)).toHaveLength(shuffled.length);
        });
    }
}