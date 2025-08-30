import { expect, test } from "vitest";
import { greet, sayGoodBye } from "./greet";

test("挨拶を返す（本来の実装どおり）", () => {
  expect(greet("Taro")).toBe("Hello! Taro.");
});

test("sayGoodBye は未実装エラーをスローする", () => {
  expect(() => sayGoodBye("Taro")).toThrow("未実装");
});
