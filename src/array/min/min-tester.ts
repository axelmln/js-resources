export class MinTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return lowest number', () => {

            const arr = [1, 2, -5, 3, 4];
            const min = this.toBeTested(arr);
            expect(min).toEqual(-5);
        });
    
        it('should return 0 (empty array)', () => {

            const arr: number[] = [];
            const min = this.toBeTested(arr);
            expect(min).toEqual(0);
        })
    
        it('should return lowest number based on object item prop', () => {

            const arr = [{
                amount: 3,
            }, {
                amount: -7,
            }, {
                amount: 1,
            }, {
                amount: 2,
            }];
            const min = this.toBeTested(arr, (item: any) => item.amount);
            expect(min).toEqual(-7);
        });
    }
}