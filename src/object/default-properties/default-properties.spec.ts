import { defaultProperties } from '.';

class DefaultPropertiesTester {
    private toBeTested!: <T>(obj: T, defaultProps: any) => any;
    constructor(toBeTested: <T>(obj: T, defaultProps: any) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should set object missing properties', () => {
            const obj = {
                prop: 'value',
                prop3: 'value3',
                prop5: 'value5',
            };
            const withDefaultsObj = this.toBeTested(obj, {
                prop: 'defaultValue',
                prop2: 'defaultValue2',
                prop3: 'defaultValue3',
                prop4: 'defaultValue4',
                prop5: 'defaultValue5',
            });
            expect(withDefaultsObj).toEqual({
                prop: 'value',
                prop2: 'defaultValue2',
                prop3: 'value3',
                prop4: 'defaultValue4',
                prop5: 'value5',
            });
        });
    }
}

describe('defaultProperties', () => {

    const tester = new DefaultPropertiesTester(
        (obj, ...args) => defaultProperties(obj, ...args)
    );
    tester.run();
});
