export class AverageTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return average', () => {
            const arr = [5, 10];
            const average = this.toBeTested(arr);
            expect(average).toEqual(7.5);  
        });
    
        it('should return 0 (empty array)', () => {
            const arr: [] = [];
            const average = this.toBeTested(arr);
            expect(average).toEqual(0);
        });
    
        it('should return average based on object item prop', () => {
            const arr = [{
                amount: 20,
            }, {
                amount: 25,
            }];
            const average = this.toBeTested(arr, (item: any) => item.amount);
            expect(average).toEqual(22.5);
        });
    }
}