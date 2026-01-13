import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchRepositories } from ".";

const mockBffGet = vi.fn();

vi.mock("@/bff/client", () => ({
  bffClient: {
    api: {
      repositories: {
        $get: (...args: unknown[]) => mockBffGet(...args),
      },
    },
  },
}));

const mockSearchResult = {
  totalCount: 100,
  items: [
    {
      id: 1,
      fullName: "facebook/react",
      description: "A JavaScript library",
      ownerAvatarUrl: "https://example.com/avatar.png",
      stargazersCount: "200k",
      htmlUrl: "https://github.com/facebook/react",
    },
  ],
};

describe("searchRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("検索結果を返却すること", async () => {
      mockBffGet.mockResolvedValue({
        ok: true,
        json: async () => mockSearchResult,
      });

      const result = await searchRepositories("react");

      expect(result).toStrictEqual({ data: mockSearchResult, error: null });
      expect(mockBffGet).toHaveBeenCalledWith({
        query: {
          query: "react",
          perPage: "30",
        },
      });
    });

    it("オプションを渡すとクエリに含まれること", async () => {
      mockBffGet.mockResolvedValue({
        ok: true,
        json: async () => mockSearchResult,
      });

      await searchRepositories("react", {
        sort: "stars",
        page: "2",
        perPage: "10",
      });

      expect(mockBffGet).toHaveBeenCalledWith({
        query: {
          query: "react",
          sort: "stars",
          page: "2",
          perPage: "10",
        },
      });
    });
  });

  describe("異常系", () => {
    it("APIレスポンスがエラーの場合、エラーを返すこと", async () => {
      mockBffGet.mockResolvedValue({
        ok: false,
        json: async () => ({ error: "エラーが発生しました" }),
      });

      const result = await searchRepositories("react");

      expect(result).toStrictEqual({
        data: null,
        error: "エラーが発生しました",
      });
    });

    it("バリデーションエラーの場合、エラーを返すこと", async () => {
      const invalidData = { ...mockSearchResult, totalCount: "invalid" };
      mockBffGet.mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });

      const result = await searchRepositories("react");

      expect(result).toStrictEqual({
        data: null,
        error: "データの形式が不正です",
      });
    });
  });
});
