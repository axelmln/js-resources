import { parseBoolean } from '.';

class ParseBooleanTester {
    private toBeTested!: (value: any) => boolean;
    constructor(toBeTested: (value: any) => boolean) {
        this.toBeTested = toBeTested;
    }

    run() {
        it('should return true for true and stringified true', () => {
            const valuesToTest = [
                true,
                'true',
                ' true',
                'True',
                'True ',
                false,
                'false',
                'false ',
                'False',
                ' False',
                undefined,
                null,
                0,
                1,
                '',
                ' ',
                'foo',
            ];
            const parsedValues = valuesToTest.map(value => this.toBeTested(value));
            expect(parsedValues.slice(0, 5).every(value => value === true)).toBe(true);
            expect(parsedValues.slice(5).every(value => value === false)).toBe(true);
        });
    }
}

describe('parseBoolean', () => {

    const tester = new ParseBooleanTester(
        (value) => parseBoolean(value)
    );
    tester.run();
});
