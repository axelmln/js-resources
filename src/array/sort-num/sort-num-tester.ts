export class SortNumTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should sort in ascending order', () => {

            const arr = [1, 3, 2, 0, -3];
            const sorted = this.toBeTested(arr);
            expect(sorted).toEqual([-3, 0, 1, 2, 3]);
        })
    
        it('should sort in descending order', () => {

            const arr = [1, 3, 2, 0, -3];
            const sorted = this.toBeTested(arr, 'descending');
            expect(sorted).toEqual([3, 2, 1, 0, -3]);
        });
    
        it('should sort in ascending order based on object item prop', () => {

            const arr = [{
                amount: 0,
            }, {
                amount: -3,
            }, {
                amount: 3,
            }];
            const sorted = this.toBeTested(arr, 'ascending', (item: any) => item.amount);
            expect(sorted).toEqual([{
                amount: -3,
            }, {
                amount: 0,
            }, {
                amount: 3,
            }]);
        });
    
        it('should sort in descending order based on object item prop', () => {

            const arr = [{
                amount: 0,
            }, {
                amount: -3,
            }, {
                amount: 3,
            }];
            const sorted = this.toBeTested(arr, 'descending', (item: any) => item.amount);
            expect(sorted).toEqual([{
                amount: 3,
            }, {
                amount: 0,
            }, {
                amount: -3,
            }]);
        });
    }
}