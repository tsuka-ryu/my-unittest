import { beforeEach, describe, expect, test, vi } from "vitest";
import { getMyArticlesData, httpError, postMyArticleData } from "./fixtures";
import { getMyArticles, getMyProfile, postMyArticle } from "./index";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("fetchers", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getMyProfile", () => {
    test("正常にプロフィールを取得できる", async () => {
      const profileData = {
        id: "test-user-id",
        name: "Test User",
        age: 30,
        email: "test@example.com",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => profileData,
      });

      const result = await getMyProfile();
      expect(result).toEqual(profileData);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://myapi.testing.com/my/profile"
      );
    });

    test("APIエラーが発生した場合は例外をスローする", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => httpError,
      });

      await expect(getMyProfile()).rejects.toEqual(httpError);
    });
  });

  describe("getMyArticles", () => {
    test("正常に記事一覧を取得できる", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => getMyArticlesData,
      });

      const result = await getMyArticles();
      expect(result).toEqual(getMyArticlesData);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://myapi.testing.com/my/articles"
      );
    });

    test("APIエラーが発生した場合は例外をスローする", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => httpError,
      });

      await expect(getMyArticles()).rejects.toEqual(httpError);
    });
  });

  describe("postMyArticle", () => {
    test("正常に記事を投稿できる", async () => {
      const input = {
        tags: ["testing", "react"],
        title: "Test Article",
        body: "This is a test article.",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => postMyArticleData,
      });

      const result = await postMyArticle(input);
      expect(result).toEqual(postMyArticleData);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://myapi.testing.com/my/articles",
        {
          method: "POST",
          body: JSON.stringify(input),
        }
      );
    });

    test("APIエラーが発生した場合は例外をスローする", async () => {
      const input = {
        tags: ["testing"],
        title: "Test",
        body: "Test body",
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => httpError,
      });

      await expect(postMyArticle(input)).rejects.toEqual(httpError);
    });
  });
});
