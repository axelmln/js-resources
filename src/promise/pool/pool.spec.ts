import { PromisePool } from '.';
import { sleep } from '../../time';

class PromisePoolTester {
    constructor(private toBeTested: (...args: any) => PromisePool) {
        this.toBeTested = toBeTested;
    }

    private async testConcurrency(concurrency: number, tasksSets = [
        [2, 1, 3]
    ]) {
        const totalNbTasks = tasksSets.flat().length;
        const promisePool = this.toBeTested()
            .setConcurrency(concurrency)
            .setTaskMapper((value: number) => {
                ++concurrencyCounter;
                return sleep(value);
            })
            .onTaskDone(() => {
                expect(concurrencyCounter).toBeLessThanOrEqual((concurrency > totalNbTasks) ? totalNbTasks : concurrency);
                --concurrencyCounter;
            });
        let concurrencyCounter = 0;
        const baseRunner = (tasks: number[]) => promisePool.run(tasks);
        const allPromisePoolsResults = await Promise.all(tasksSets.map(tasks => baseRunner(tasks)));
        allPromisePoolsResults.forEach((result, index) => {
            expect(result).toEqual(tasksSets[index])
        });
    }

    run() {
        describe('general behaviour checks', () => {
            test('mapper', async () => {
                const promisePool = this.toBeTested();
                const promisePoolResults = await promisePool
                    .setTaskMapper((value: number) => sleep(value * 2))
                    .run([
                        1,
                        2,
                    ]);
                    expect(promisePoolResults).toEqual([
                        2,
                        4,
                    ]);
            });
            test('filterer', async () => {
                const promisePool = this.toBeTested();
                const promisePoolResults = await promisePool
                    .setTaskMapper((value: number) => sleep(value * 2))
                    .setTaskFilter((value: number) => value !== 1)
                    .run([
                        1,
                        2,
                        3,
                    ]);
                    expect(promisePoolResults).toEqual([
                        4,
                        6,
                    ]);
            });
            test('onTaskDone', async () => {
                const promisePool = this.toBeTested();
                const rawCallbacksReports: any[] = [];
                const advancementsReports: any[] = []
                const promisePoolResults = await promisePool
                    .setTaskMapper((value: number) => sleep(value * 2))
                    .setTaskFilter((value: number) => value !== 1)
                    .onTaskDone((result, index, nbTasks) => rawCallbacksReports.push({
                        result,
                        index,
                        nbTasks,
                    }))
                    .onTaskDone((_, index, nbTasks) => advancementsReports.push({
                        advancement: Math.round((index + 1) / nbTasks * 100),
                    }))
                    .run([
                        1,
                        2,
                        3,
                    ]);
                    expect(promisePoolResults).toEqual([
                        4,
                        6,
                    ]);
                    expect(rawCallbacksReports).toEqual([{
                        result: 4,
                        index: 0,
                        nbTasks: 2,
                    }, {
                        result: 6,
                        index: 1,
                        nbTasks: 2,
                    }]);
                    expect(advancementsReports).toEqual([{
                        advancement: 50,
                    }, {
                        advancement: 100,
                    }]);
            });
            describe('single input task (not a tasks array)', () => {
                test('with fn task', async () => {
                    const promisePool = this.toBeTested();
                    const promisePoolResults = await promisePool
                        .run(() => sleep(1));
                    expect(promisePoolResults).toEqual(1);
                });
                test('with mapped task', async () => {
                    const promisePool = this.toBeTested();
                    const promisePoolResults = await promisePool
                        .setTaskMapper((value: number) => sleep(value))
                        .run(1);
                    expect(promisePoolResults).toEqual(1);
                });
            });
        });
        describe('should respect set concurrency', () => {
            test('concurrency set to 1 / 3 promises', async () => {
                await this.testConcurrency(1);
            });
            test('concurrency set to 2 / 3 promises', async () => {
                await this.testConcurrency(2);
            });
            test('concurrency set to 3 / 3 promises', async () => {
                await this.testConcurrency(3);
            });
            test('concurrency set to more than 3 / 3 promises', async () => {
                await this.testConcurrency(10);
            });
            test('concurrency set to Infinity / 3 promises', async () => {
                await this.testConcurrency(Infinity);
            });
            test('concurrency set to 0 then resume', async () => {
                const promisePool = this.toBeTested();
                promisePool.pause();
                let resolved = false;
                const promise = promisePool
                    .run('foo')
                    .then(result => {
                        resolved = true;
                        return result;
                    });
                setTimeout(() => {
                    expect(resolved).toEqual(false);
                    promisePool.resume();
                    setTimeout(async () => {
                        expect(resolved).toEqual(true);
                        const result = await promise;
                        expect(result).toEqual('foo');
                    });
                });
            });
        });
        describe('should return correct values when multiple run calls are made concurrently', () => {
            test('', async () => {
                const promisePool = this.toBeTested()
                    .setConcurrency(2)
                    .setTaskMapper((value: number) => sleep(value));
                const allPromisePoolsResults = await Promise.all([
                    promisePool
                        .run([
                            3,
                            2,
                            1,
                        ]),
                    promisePool
                        .run([
                            4,
                            5,
                            6,
                        ]),
                ]);
                expect(allPromisePoolsResults[0]).toEqual([
                    3,
                    2,
                    1,
                ]);
                expect(allPromisePoolsResults[1]).toEqual([
                    4,
                    5,
                    6,
                ]);
            });
        });
        describe('should respect concurrency when multiple run calls are made concurrently', () => {
            const tasksSets = [
                [2, 1, 3],
                [5, 6, 4],
            ]
            test('with concurrency set to 1 / (3 * 2) promises', async () => {
                await this.testConcurrency(1, tasksSets);
            });
            test('with concurrency set to 2 / (3 * 2) promises', async () => {
                await this.testConcurrency(2, tasksSets);
            });
            test('with concurrency set to 3 / (3 * 2) promises', async () => {
                await this.testConcurrency(3, tasksSets);
            });
            test('with concurrency set to 4 / (3 * 2) promises', async () => {
                await this.testConcurrency(4, tasksSets);
            });
            test('with concurrency set to 5 / (3 * 2) promises', async () => {
                await this.testConcurrency(5, tasksSets);
            });
            test('with concurrency set to 6 / (3 * 2) promises', async () => {
                await this.testConcurrency(6, tasksSets);
            });
        });
    }
}

describe('PromisePool', () => {

    const tester = new PromisePoolTester(
        (...args) => new PromisePool(...args)
    );
    tester.run();
});
