export class AsArrayTester {
    private toBeTested!: (value: any) => any;
    constructor(toBeTested: (value: any) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return input value wrapped in array', () => {
            const inValue = 'foo';
            const wrappedValue = this.toBeTested(inValue);
            expect(wrappedValue).toEqual([inValue]);
        });
    
        it('should return input array', () => {
            const arr = ['foo'];
            const processedArr = this.toBeTested(arr);
            expect(processedArr).toEqual(arr);
        });
    }
}
