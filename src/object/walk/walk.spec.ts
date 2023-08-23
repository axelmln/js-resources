import { objectWalk } from '.';

class WalkTester {
    private toBeTested!: <T>(obj: T, cb: (cbProps: any) => any) => any;
    constructor(toBeTested: <T>(obj: T, cb: (cbProps: any) => any) => any) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should walk through object recursively', () => {
            const obj = {
                prop1: {
                    prop1_nestedLevel1: {
                        prop1_nestedLevel2: {
                            prop1_nestedLevel3: 'foo',
                        }
                    }
                },
                prop2: {
                    prop2_nestedLevel1: 'bar',
                    prop2_nestedLevel1_bis: {
                        prop2_nestedLevel2: 7,
                    },
                },
            };
            const objectWalkReport: any[] = [];
            this.toBeTested(obj, ({
                value,
                key,
                currObject,
                level,
                path,
            }) => {
                objectWalkReport.push({
                    value,
                    key,
                    currObject,
                    level,
                    path,
                });
            });
            expect(objectWalkReport).toEqual([{
                value: obj.prop1,
                key: 'prop1',
                currObject: obj,
                level: 0,
                path: ['prop1'],
            }, {
                value: obj.prop1.prop1_nestedLevel1,
                key: 'prop1_nestedLevel1',
                currObject: obj.prop1,
                level: 1,
                path: ['prop1', 'prop1_nestedLevel1'],
            }, {
                value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
                key: 'prop1_nestedLevel2',
                currObject: obj.prop1.prop1_nestedLevel1,
                level: 2,
                path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2'],
            }, {
                value: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2.prop1_nestedLevel3,
                key: 'prop1_nestedLevel3',
                currObject: obj.prop1.prop1_nestedLevel1.prop1_nestedLevel2,
                level: 3,
                path: ['prop1', 'prop1_nestedLevel1', 'prop1_nestedLevel2', 'prop1_nestedLevel3'],
            }, {
                value: obj.prop2,
                key: 'prop2',
                currObject: obj,
                level: 0,
                path: ['prop2'],
            }, {
                value: obj.prop2.prop2_nestedLevel1,
                key: 'prop2_nestedLevel1',
                currObject: obj.prop2,
                level: 1,
                path: ['prop2', 'prop2_nestedLevel1'],
            }, {
                value: obj.prop2.prop2_nestedLevel1_bis,
                key: 'prop2_nestedLevel1_bis',
                currObject: obj.prop2,
                level: 1,
                path: ['prop2', 'prop2_nestedLevel1_bis'],
            }, {
                value: obj.prop2.prop2_nestedLevel1_bis.prop2_nestedLevel2,
                key: 'prop2_nestedLevel2',
                currObject: obj.prop2.prop2_nestedLevel1_bis,
                level: 2,
                path: ['prop2', 'prop2_nestedLevel1_bis', 'prop2_nestedLevel2'],
            }]);
        });
    
        it('should walk through object recursively but stop when specified', () => {
            const obj = {
                prop: {
                    nestedLevel1: {
                        nestedLevel2: {
                            nestedLevel3: 'foo',
                        }
                    }
                },
                prop2: {
                    nestedLevel1: 'bar',
                },
            };
            const objectWalkReport: any[] = [];
            this.toBeTested(obj, ({
                value,
                key,
                currObject,
                level,
                path,
            }) => {
                objectWalkReport.push({
                    value,
                    key,
                    currObject,
                    level,
                    path,
                });
                if (key === 'nestedLevel2') return false;
            });
            expect(objectWalkReport).toEqual([{
                value: obj.prop,
                key: 'prop',
                currObject: obj,
                level: 0,
                path: ['prop'],
            }, {
                value: obj.prop.nestedLevel1,
                key: 'nestedLevel1',
                currObject: obj.prop,
                level: 1,
                path: ['prop', 'nestedLevel1'],
            }, {
                value: obj.prop.nestedLevel1.nestedLevel2,
                key: 'nestedLevel2',
                currObject: obj.prop.nestedLevel1,
                level: 2,
                path: ['prop', 'nestedLevel1', 'nestedLevel2'],
            }]);
        });
    }
}

describe('objectWalk', () => {

    const tester = new WalkTester(
        (obj, cb) => objectWalk(obj, cb)
    );
    tester.run();
});
