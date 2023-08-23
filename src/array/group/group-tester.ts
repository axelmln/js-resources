export class GroupTester {
    private toBeTested!: (array: any[], ...args: any[]) => any;
    constructor(toBeTested: (array: any[], ...args: any[]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return an object with keys mapping to an array of matching items', () => {
            const arr = [{
                ref: 'foo',
                prop: 'bar',
            }, {
                ref: 'fuu',
                prop: 'beer',
            }, {
                ref: 'foo',
                prop: 'baz',
            }];
            const grouped = this.toBeTested(arr, (item: any) => item.ref);
            expect(grouped).toEqual({
                foo: [{
                    ref: 'foo',
                    prop: 'bar',
                },{
                    ref: 'foo',
                    prop: 'baz',
                }],
                fuu: [{
                    ref: 'fuu',
                    prop: 'beer',
                }],
            });
        });
    }
}