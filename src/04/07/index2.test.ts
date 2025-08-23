// 依存性注入パターンのテスト例
// - グローバル状態を変更しない
// - 各テストが独立している
// - タイマーモックが不要
// - テストが読みやすい
// - 認知負荷が低い

import { describe, expect, test } from "vitest";
import { greetByTime } from ".";

describe("greetByTime(", () => {
  test("朝は「おはよう」を返す", () => {
    // 直接Dateオブジェクトを渡すことで、グローバル状態に影響しない
    const morningTime = new Date(2023, 4, 23, 8, 0, 0);
    expect(greetByTime(morningTime)).toBe("おはよう");
  });

  test("昼は「こんにちは」を返す", () => {
    // 他のテストと完全に独立している
    const afternoonTime = new Date(2023, 4, 23, 14, 0, 0);
    expect(greetByTime(afternoonTime)).toBe("こんにちは");
  });

  test("夜は「こんばんは」を返す", () => {
    // vi.useFakeTimers()やsetSystemTime()のような複雑なセットアップが不要
    const eveningTime = new Date(2023, 4, 23, 21, 0, 0);
    expect(greetByTime(eveningTime)).toBe("こんばんは");
  });
});
