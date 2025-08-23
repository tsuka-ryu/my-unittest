import { describe, expect, test, vi } from "vitest";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";
import { getGreet } from ".";

vi.mock("../fetchers");

describe("getGreet", () => {
  test("データ取得成功時：ユーザー名がない場合", async () => {
    // getMyProfile が resolve した時の値を再現
    vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
    });
    await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
  });
  test("データ取得成功時：ユーザー名がある場合", async () => {
    vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
      name: "taroyamada",
    });
    await expect(getGreet()).resolves.toBe("Hello, taroyamada!");
  });
  test("データ取得失敗時", async () => {
    // getMyProfile が reject した時の値を再現
    vi.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    await expect(getGreet()).rejects.toMatchObject({
      err: { message: "internal server error" },
    });
  });
  test("データ取得失敗時、エラー相当のデータが例外としてスローされる", async () => {
    expect.assertions(1);
    vi.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch (err) {
      expect(err).toMatchObject(httpError);
    }
  });
});
