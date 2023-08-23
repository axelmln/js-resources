import { setProperty } from '.';

class SetPropertyTester {
    private toBeTested!: <T>(obj: T, ...args: [string | any[], any]) => any;
    constructor(toBeTested: <T>(obj: T, ...args: [string | any[], any]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        describe('should set first level existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                this.toBeTested(obj, path, 'bar');
                expect(obj).toEqual({
                    prop: 'bar',
                });
            };
            test('with string path', () => {
                tester('prop');
            });
            test('with array path', () => {
                tester(['prop']);
            });
        });
    
        describe('should set first level not existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                this.toBeTested(obj, path, 'bar');
                expect(obj).toEqual({
                    prop: 'foo',
                    prop2: 'bar',
                });
            };
            test('with string path', () => {
                tester('prop2');
            });
            test('with array path', () => {
                tester(['prop2']);
            });
        });
    
        describe('should set nested level existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                    nested: {
                        nestedProp: 'bar',
                    },
                };
                this.toBeTested(obj, path, 'newValue');
                expect(obj).toEqual({
                    prop: 'foo',
                    nested: {
                        nestedProp: 'newValue',
                    },
                });
            };
            test('with string path', () => {
                tester('nested.nestedProp');
            });
            test('with array path', () => {
                tester(['nested', 'nestedProp']);
            });
        });
    
        describe('should set nested level not existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                this.toBeTested(obj, path, 'bar');
                expect(obj).toEqual({
                    prop: 'foo',
                    nested: {
                        nestedProp: 'bar',
                    },
                });
            };
            test('with string path', () => {
                tester('nested.nestedProp');
            });
            test('with array path', () => {
                tester(['nested', 'nestedProp']);
            });
        });
    
        describe('should set nested level as array (with number index)', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                this.toBeTested(obj, path, 'bar');
                expect(obj).toEqual({
                    prop: 'foo',
                    nested: [{
                        nestedProp: 'bar',
                    }],
                });
            };
            test('with string path', () => {
                tester('nested.0.nestedProp');
            });
            test('with array path', () => {
                tester(['nested', 0, 'nestedProp']);
            });
        });
    }
}

describe('setProperty', () => {

    const tester = new SetPropertyTester(
        (obj, ...args) => setProperty(obj, ...args)
    );
    tester.run();
});
