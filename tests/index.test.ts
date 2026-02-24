import { expect, test, describe } from "bun:test";
import { add } from "../src/index.ts";

describe("Math functions", () => {
  test("add", () => {
    expect(add(2, 2)).toBe(4);
  });
});
