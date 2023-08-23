import { getProperty } from '.';

class GetPropertyTester {
    private toBeTested!: <T>(obj: T, ...args: [string | any[], any?]) => any;
    constructor(toBeTested: <T>(obj: T, ...args: [string | any[], any?]) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        describe('should get first level existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                const retrievedValue = this.toBeTested(obj, path, 'fallback');
                expect(retrievedValue).toEqual('foo');
            };
            test('with string path', () => {
                tester('prop');
            });
            test('with array path', () => {
                tester(['prop']);
            });
        });
    
        describe('should try to get first level not existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                const retrievedValue = this.toBeTested(obj, path);
                expect(retrievedValue).toBeUndefined();
                const retrievedValueWithFallback = this.toBeTested(obj, path, 'fallback');
                expect(retrievedValueWithFallback).toEqual('fallback');
            };
            test('with string path', () => {
                tester('prop2');
            });
            test('with array path', () => {
                tester(['prop2']);
            });
        });
    
        describe('should get nested level existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                    nested: {
                        nestedProp: 'bar',
                    },
                };
                const retrievedValue = this.toBeTested(obj, path, 'fallback');
                expect(retrievedValue).toEqual('bar');
            };
            test('with string path', () => {
                tester('nested.nestedProp');
            });
            test('with array path', () => {
                tester(['nested', 'nestedProp']);
            });
        });
    
        describe('should try to get nested level not existing property', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                };
                const retrievedValue = this.toBeTested(obj, path);
                expect(retrievedValue).toBeUndefined();
                const retrievedValueWithFallback = this.toBeTested(obj, path, 'fallback');
                expect(retrievedValueWithFallback).toEqual('fallback');
            };
            test('with string path', () => {
                tester('nested.nestedProp');
            });
            test('with array path', () => {
                tester(['nested', 'nestedProp']);
            });
        });
    
        describe('should get nested array value (with number index)', () => {
            const tester = (path: string | any[]) => {
                const obj = {
                    prop: 'foo',
                    nested: [{
                        nestedProp: 'bar',
                    }],
                };
                const retrievedValue = this.toBeTested(obj, path);
                expect(retrievedValue).toEqual('bar');
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

describe('getProperty', () => {

    const tester = new GetPropertyTester(
        (obj, ...args) => getProperty(obj, ...args)
    );
    tester.run();
});
