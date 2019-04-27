import * as assert from "assert";
import { sleep } from "@quickts/sleep";
import { timeout } from "./../src";

async function test<T>(ms: number, data: T) {
    await sleep(100);
    return data;
}

describe("#timeout", () => {
    it("#timeout1", async () => {
        assert.doesNotReject(async function() {
            const data = await timeout(test(100, 100), 120);
            assert.equal(data, 100);
        });
    });

    it("#timeout2", async () => {
        assert.rejects(async function() {
            await timeout(test(100, 100), 80);
            assert.fail();
        });
    });
});
