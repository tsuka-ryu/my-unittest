import { expect, test, vi } from "vitest";
import { greet, sayGoodBye } from "./greet";

vi.mock("./greet", async () => {
  const actual = await vi.importActual("./greet");
  return {
    ...actual,
    sayGoodBye: (name: string) => `Good bye, ${name}.`,
  };
});

test("挨拶を返す（本来の実装どおり）", () => {
  expect(greet("Taro")).toBe("Hello! Taro.");
});

test("さよならを返す（本来の実装ではない）", () => {
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro. See you.");
});
