export function timeout<T>(promise: Promise<T>, ms: number) {
    return new Promise<T>((resolve, reject) => {
        let timer: NodeJS.Timeout | undefined;
        timer = setTimeout(() => {
            timer = undefined;
            reject(new Error(`Promise timed out after ${ms} milliseconds`));
        }, ms);
        promise.then(
            data => {
                if (timer) {
                    clearTimeout(timer);
                    resolve(data);
                }
            },
            err => {
                if (timer) {
                    clearTimeout(timer);
                    reject(err);
                }
            }
        );
    });
}
