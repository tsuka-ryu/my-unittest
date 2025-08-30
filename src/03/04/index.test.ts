import { describe, expect, test } from "vitest";
import { add, sub } from ".";

describe("四則演算", () => {
  describe("add", () => {
    test("返り値は、第一引数と第二引数の「和」である", () => {
      expect(add(50, 50)).toBe(100);
    });
    test("合計が100を超える場合は100を返す", () => {
      expect(add(60, 50)).toBe(100);
    });
  });
  describe("sub", () => {
    test("返り値は、第一引数と第二引数の「差」である", () => {
      expect(sub(80, 30)).toBe(50);
    });
    test("差がマイナスになる場合は0を返す", () => {
      expect(sub(30, 50)).toBe(0);
    });
  });
});
