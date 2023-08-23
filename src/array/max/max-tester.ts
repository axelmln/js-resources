export class MaxTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return highest number', () => {

            const arr = [1, 2, 5, 3, 4];
            const max = this.toBeTested(arr);
            expect(max).toEqual(5);
        });
    
        it('should return 0 (empty array)', () => {

            const arr: number[] = [];
            const max = this.toBeTested(arr);
            expect(max).toEqual(0);
        });
    
        it('should return highest number based on object item prop', () => {

            const arr = [{
                amount: 3,
            }, {
                amount: 7,
            }, {
                amount: 1,
            }, {
                amount: 2,
            }];
            const max = this.toBeTested(arr, (item: any) => item.amount);
            expect(max).toEqual(7);
        });
    }
}