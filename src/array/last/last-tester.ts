export class LastTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should last item', () => {
            const arr = [1, 2, 3, 4, 5];
            const last = this.toBeTested(arr);
            expect(last).toEqual(5);
        });
    
        it('should return undefined (empty array)', () => {
            const arr: [] = [];
            const last = this.toBeTested(arr);
            expect(last).toEqual(undefined);
        });
    }
}