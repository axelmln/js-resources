import { range } from '../range';

export class RandomPickTester {
    private toBeTested!: <T>(arr: T[]) => any;
    constructor(toBeTested: <T>(arr: T[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return random array item', () => {
            const arr = range(1000);
            const randItemFirst = this.toBeTested(arr);
            expect(arr).toContain(randItemFirst);
            const randItemSecond = this.toBeTested(arr);
            expect(arr).toContain(randItemSecond);
            expect(randItemFirst).not.toBe(randItemSecond);
        });
    
        it('should return undefined (empty array)', () => {
            const arr: [] = [];
            const randItem = this.toBeTested(arr);
            expect(randItem).toBeUndefined();
        });
    }
}