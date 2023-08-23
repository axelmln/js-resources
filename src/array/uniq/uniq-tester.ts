export class UniqTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should perform simple duplicates remove', () => {

            const arr = [1, 2, 1, 3, 3, 4, 5];
            const sanitizedArray = this.toBeTested(arr);
            expect(sanitizedArray).toEqual([1, 2, 3, 4, 5]);
        })
    
        it('should not remove different types look alikes', () => {

            const arr = [1, 2, '1', 3, 3, 4, 5];
            const sanitizedArray = this.toBeTested(arr);
            expect(sanitizedArray).toEqual([1, 2, '1', 3, 4, 5]);
        });
    
        it('should perform complex duplicates remove (based on object item prop)', () => {

            const arr = [{
                id: 1,
            }, {
                id: 2,
            }, {
                id: 2,
            }, {
                id: 1,
            }, {
                id: 3,
            }];
            const sanitizedArray = this.toBeTested(arr, (item: any) => item.id);
            expect(sanitizedArray).toEqual([{
                id: 1,
            }, {
                id: 2,
            }, {
                id: 3,
            }]);
        });
    }
}
