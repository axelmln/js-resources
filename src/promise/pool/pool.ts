import { asArray } from '../../array';

type TaskFilterPredicate<T = any> = (value: T) => unknown;
type TaskMapperCallback<T = any> = (value: T) => unknown;
type OnTaskDoneCallback<T = any> = (taskResult: T, taskIndex: number, nbTasks: number) => any;

/**
 * A simple Promise pool to handle concurrency
 * @example
 * const pool = new PromisePool()
 *      .setConcurrency(3)
 *      .onTaskDone((result) => console.log(result));
 * const results = await pool.run([
 *      asyncFn,
 *      asyncFn,
 *      asyncFn,
 *      asyncFn,
 *      asyncFn,
 * ]);
 * /////////////////////////////////////////////////
 * const pool = new PromisePool(2)
 *      .setTaskMapper((value) => {
 *          // async stuffs...
 *      }) // -> Used to tranform 'tasks' passed in `run` method
 *      .onTaskDone((_, index, nbTasks) => console.log(Math.round((index + 1) / nbTasks * 100)), '%');
 * const results = await pool.run([
 *      {ref: 'foo'},
 *      {ref: 'fuu'},
 *      {ref: 'bar'},
 *      {ref: 'baz'},
 * ]);
 * /////////////////////////////////////////////////
 * const pool = new PromisePool(1);
 * (async function fn1() {
 *      const result = await pool.run(asyncFn);
 * })();
  * (async function fn2() {
 *      const result = await pool.run(asyncFn); // -> Won't be triggered before fn1 run ends
 * })();
 **/
export class PromisePool {
    /**
     * @param concurrency Must be between 0 (paused) and Infinity (no limit). Default is 5.
     */
    constructor(private concurrency = 5) {
        this.#setConcurrency(concurrency);
        this.#previousConcurrency = concurrency;
    }

    #taskFilter: TaskFilterPredicate =  () => true;
    #taskMapper: TaskMapperCallback =  (t) => t;
    #previousConcurrency!: number;
    #setConcurrency(concurrency: number) {
        this.concurrency = (concurrency < 0) ? 5 : concurrency;
    }
    #isConcurrencyReached() {
        return !this.#nbFreeSlots();
    }
    #nbFreeSlots() {
        return this.concurrency - this.#processingQueue.length;
    }
    #waitingFreeSlot: Promise<void> | null = null;
    #freeSlotSignal: (() => void) | null = null;
    async #waitFreeSlotSignal() {
        while (this.#isConcurrencyReached()) {
            this.#waitingFreeSlot ??= new Promise(resolve => this.#freeSlotSignal = resolve);

            await this.#waitingFreeSlot;
            this.#waitingFreeSlot = null
        }
    }
    #notifyFreeSlot() {
        this.#freeSlotSignal?.();
        this.#freeSlotSignal = null;
    }
    #createTask(task: any) {
        const wrappedTask = async () => {
            const mappedTask = this.#taskMapper(task);
            return typeof mappedTask === 'function'
                ? await mappedTask()
                : mappedTask;
        };
        return wrappedTask;
    }
    #processingQueue: any[] = [];
    #enqueueProcessing(taskPromise: any) {
        const currTasksPromises = asArray(taskPromise);
        this.#processingQueue.push(...currTasksPromises);
    }
    #dequeueProcessing(taskPromise: any) {
        const taskPromiseIndex = this.#processingQueue.findIndex(item => item === taskPromise);
        this.#processingQueue.splice(taskPromiseIndex, 1);
        this.#notifyFreeSlot();
    }
    async #drainTasks(tasks: any[]) {
        const nbTasks = tasks.length;
        const tasksPromises: any[] = [];
        let taskIndex = -1;
        while(tasks.length) {
            await this.#waitFreeSlotSignal();

            const currTasks = tasks.splice(0, this.#nbFreeSlots());
            const currTasksPromises = currTasks.map(task => task());
            this.#enqueueProcessing(currTasksPromises);

            tasksPromises.push(...currTasksPromises.map((taskPromise: any) => {
                return taskPromise.then((result: any) => {
                    const currTaskIndex = ++taskIndex;
                    this.#runOnTaskDoneCbList(result, currTaskIndex, nbTasks);
                    this.#dequeueProcessing(taskPromise);
                    return result;
                });
            }));
        }
        return tasksPromises;
    }
    #onTaskDoneCbList: OnTaskDoneCallback[] = [];
    #runOnTaskDoneCbList(result: any, currTaskIndex: number, nbTasks: number) {
        this.#onTaskDoneCbList.forEach(cb => cb(result, currTaskIndex, nbTasks));
    }

    /**
     * 
     * Sets concurrency with the provided number.  
     * Must be between 0 (paused) and Infinity (no limit). Default is 5.
     */
    setConcurrency(concurrency: number) {
        this.#setConcurrency(concurrency);
        (concurrency > 0) && this.#notifyFreeSlot();
        return this;
    }
    /**
     * 
     * Stops processing tasks by setting concurrency to 0.  
     */
    pause() {
        this.#previousConcurrency = this.concurrency;
        this.#previousConcurrency <= 0 && (this.concurrency = 5);
        this.#setConcurrency(0);
        return this;
    }
    /**
     * Resumes tasks processing by setting concurrency to its previous value.  
    */
    resume() {
        this.setConcurrency(this.#previousConcurrency);
        return this;
    }
    /**
     * 
     * A function that will be called on each task.  
     * A task is removed if the `callback` return value is falsy.  
     */
    setTaskFilter<T>(predicate: TaskFilterPredicate<T>) {
        this.#taskFilter = predicate;
        return this;
    }
    /**
     * 
     * Set a mapper function that will be called on each task. Each of them will be tranformed according to the `callback` return value.  
     */
    setTaskMapper<T>(callback: TaskMapperCallback<T>) {
        this.#taskMapper = callback;
        return this;
    }
    /**
     * 
     * Registers a function to be called a tasks is finished.  
     */
    onTaskDone<T>(callback: OnTaskDoneCallback<T>) {
        this.#onTaskDoneCbList.push(callback);
        return this;
    }
    /**
     * 
     * Runs provided `tasks` according to PromisePool instance settings.  
     * `tasks` can be an array or a single job, and each of them can be a function or any other type.  
     * If an array is provided, an array of results will be returned.  
     * Otherwise, the result of the single task will be returned.  
     */
    async run<T>(tasks: any): Promise<T> {
        const tasksWereProvidedAsArray = Array.isArray(tasks);
        const wrappedTasks = asArray(tasks)
            .filter((value) => this.#taskFilter(value))
            .map((value) => this.#createTask(value));

        const tasksPromises = await this.#drainTasks(wrappedTasks);

        const results = await Promise.all(tasksPromises);

        return tasksWereProvidedAsArray
            ? results
            : results[0];
    }
}
