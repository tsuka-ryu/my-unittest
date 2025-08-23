import { expect, test, vi } from "vitest";
import { checkConfig } from "./checkConfig";

test("モック関数は実行時引数のオブジェクト検証ができる", () => {
  const mockFn = vi.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
  });
});

test("expect.objectContaining による部分検証", () => {
  const mockFn = vi.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith(
    expect.objectContaining({
      feature: { spy: true },
    })
  );
});
