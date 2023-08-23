export class ChunkTester {
    private toBeTested!: (array: any[], chunkSize: number) => any;
    constructor(toBeTested: (array: any[], chunkSize: number) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return 3 chunk arrays of 3 items', () => {
            const arr = [
                1, 2, 3,
                4, 5, 6,
                7, 8, 9,
            ];
            const chunked = this.toBeTested(arr, 3);
            expect(chunked).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
        });
    
        it('should return 3 chunk arrays of 3 items + 1 array of 2 items', () => {
            const arr = [
                1, 2, 3,
                4, 5, 6,
                7, 8, 9,
                10, 11,
            ];
            const chunked = this.toBeTested(arr, 3);
            expect(chunked).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [10, 11],
            ]);
        });
    }
}