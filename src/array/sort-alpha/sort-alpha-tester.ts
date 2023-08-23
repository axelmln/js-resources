export class SortAlphaTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should sort in ascending order', () => {
            const arr = ['abc', 'bac', 'aaa'];
            const sorted = this.toBeTested(arr);
            expect(sorted).toEqual(['aaa', 'abc', 'bac']);
        });
    
        it('should sort in descending order', () => {
            const arr = ['abc', 'bac', 'aaa'];
            const sorted = this.toBeTested(arr, 'descending');
            expect(sorted).toEqual(['bac', 'abc', 'aaa']);
        })
    
        it('should sort in ascending order based on object item prop', () => {
            const arr = [{
                ref: 'abc',
            }, {
                ref: 'bac',
            }, {
                ref: 'aaa',
            }];
            const sorted = this.toBeTested(arr, 'ascending', (item: any) => item.ref);
            expect(sorted).toEqual([{
                ref: 'aaa',
            }, {
                ref: 'abc',
            }, {
                ref: 'bac',
            }]);
        });
    
        it('should sort in descending order based on object item prop', () => {
            const arr = [{
                ref: 'abc',
            }, {
                ref: 'bac',
            }, {
                ref: 'aaa',
            }];
            const sorted = this.toBeTested(arr, 'descending', (item: any) => item.ref);
            expect(sorted).toEqual([{
                ref: 'bac',
            }, {
                ref: 'abc',
            }, {
                ref: 'aaa',
            }]);
        });
    }
}