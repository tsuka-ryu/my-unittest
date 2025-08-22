import { expect, test, vi } from "vitest";
import { greet } from "./greet";

vi.mock("./greet");

test("挨拶を返さない（本来の実装ではない）", () => {
  expect(greet("Taro")).toBe(undefined);
});
