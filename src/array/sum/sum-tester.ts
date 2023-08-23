export class SumTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return sum', () => {
            const arr = [5, 10, 20];
            const sum = this.toBeTested(arr);
            expect(sum).toEqual(35);
        });
    
        it('should return 0 (empty array)', () => {
            const arr: [] = [];
            const sum = this.toBeTested(arr);
            expect(sum).toEqual(0);
        });
    
        it('should return sum based on object item prop', () => {
            const arr = [{
                amount: 20,
            }, {
                amount: 25,
            }, {
                amount: 35,
            }];
            const sum = this.toBeTested(arr, (item: any) => item.amount);
            expect(sum).toEqual(80);
        });
    }
}