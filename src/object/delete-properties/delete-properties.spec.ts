import { deleteProperties } from '.';

class DeletePropertiesTester {
    private toBeTested!: <T>(obj: T, props: any, opts?: any) => any;
    constructor(toBeTested: <T>(obj: T, props: any, opts?: any) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return copy object without specified properties', () => {
            const obj = {
                prop: 'value',
                prop2: 'value2',
                prop3: 'value3',
                prop4: 'value4',
                prop5: 'value5',
            };
            const withDefaultsObj = this.toBeTested(obj, [
                'prop',
                'prop3',
                'prop4',
            ]);
            expect(withDefaultsObj).toEqual({
                prop2: 'value2',
                prop5: 'value5',
            });
            expect(obj).toEqual({
                prop: 'value',
                prop2: 'value2',
                prop3: 'value3',
                prop4: 'value4',
                prop5: 'value5',
            });
            expect(withDefaultsObj).not.toBe(obj);
        });
    
        it('should delete object specified properties (no copy)', () => {
            const obj = {
                prop: 'value',
                prop2: 'value2',
                prop3: 'value3',
                prop4: 'value4',
                prop5: 'value5',
            };
            this.toBeTested(obj, [
                'prop',
                'prop3',
                'prop4',
            ], {
                copyInputObject: false,
            });
            expect(obj).toEqual({
                prop2: 'value2',
                prop5: 'value5',
            });
        });
    }
}

describe('deleteProperties', () => {

    const tester = new DeletePropertiesTester(
        (obj, props, opts) => deleteProperties(obj, props, opts)
    );
    tester.run();
});
