import { expect, test, vi } from "vitest";
import { greet } from "./greet";

test("モック関数は実行された", () => {
  const mockFn = vi.fn();
  mockFn();
  expect(mockFn).toBeCalled();
});

test("モック関数は実行されていない", () => {
  const mockFn = vi.fn();
  expect(mockFn).not.toBeCalled();
});

test("モック関数は実行された回数を記録している", () => {
  const mockFn = vi.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});

test("モック関数は関数の中でも実行できる", () => {
  const mockFn = vi.fn();
  function greet() {
    mockFn();
  }
  greet();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("モック関数は実行時の引数を記録している", () => {
  const mockFn = vi.fn();
  function greet(message: string) {
    mockFn(message);
  }
  greet("hello");
  expect(mockFn).toHaveBeenCalledWith("hello");
});

test("モック関数はテスト対象の引数として使用できる", () => {
  const mockFn = vi.fn();
  greet("Jiro", mockFn);
  expect(mockFn).toHaveBeenCalledWith("Hello! Jiro");
});
