import { describe, expect, test } from "vitest";
import { add, sub } from ".";

describe("四則演算", () => {
  describe("add", () => {
    test("返り値は、第一引数と第二引数の「和」である", () => {
      expect(add(50, 50)).toBe(100);
    });
  });
  describe("sub", () => {
    test("返り値は、第一引数と第二引数の「差」である", () => {
      expect(sub(70, 80)).toBe(0);
    });
  });
});
