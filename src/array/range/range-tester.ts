export class RangeTester {
    private toBeTested!: (...args: number[]) => any;
    constructor(toBeTested: (...args: number[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should create an array from 0 up to specified number (not included)', () => {
            const rangeArr = this.toBeTested(5);
            expect(rangeArr).toEqual([0, 1, 2, 3, 4]);
        })
    
        it('should create an array from specified number up to specified number (not included)', () => {
            const rangeArr = this.toBeTested(5, 10);
            expect(rangeArr).toEqual([5, 6, 7, 8, 9]);
        });
        it('should create an array from specified number up to specified number (not included), with start > stop', () => {
            const rangeArr = this.toBeTested(10, 5);
            expect(rangeArr).toEqual([10, 9, 8, 7, 6]);
        });
    
        it('should create an array from specified number up to specified number (not included), with specified increment', () => {
            const rangeArr = this.toBeTested(5, 15, 3);
            expect(rangeArr).toEqual([5, 8, 11, 14]);
        })
        it('should create an array from specified number up to specified number (not included), with specified decrement', () => {
            const rangeArr = this.toBeTested(5, 0, -1);
            expect(rangeArr).toEqual([5, 4, 3, 2, 1]);
        });
    
        it('should throw with invalid input range', () => {
            expect(
                () => this.toBeTested(5, 0, 1)
            ).toThrow();
            expect(
                () => this.toBeTested(0, 5, -1)
            ).toThrow();
        });
    }
}