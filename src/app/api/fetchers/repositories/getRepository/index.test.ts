import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRepository } from ".";

const mockBffGet = vi.fn();

vi.mock("../../bffClient", () => ({
  bffClient: {
    api: {
      repositories: {
        ":owner": {
          ":repo": {
            $get: (...args: unknown[]) => mockBffGet(...args),
          },
        },
      },
    },
  },
}));

const mockRepository = {
  id: 1,
  fullName: "facebook/react",
  description: "A JavaScript library",
  ownerAvatarUrl: "https://example.com/avatar.png",
  stargazersCount: "200k",
  watchersCount: "150k",
  forksCount: "40k",
  openIssuesCount: "1.0k",
  language: "JavaScript",
  license: "MIT License",
  createdAt: "2013年5月24日",
  updatedAt: "2024年1月1日",
  htmlUrl: "https://github.com/facebook/react",
};

describe("getRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("リポジトリ情報を返却すること", async () => {
      mockBffGet.mockResolvedValue({
        ok: true,
        json: async () => mockRepository,
      });

      const result = await getRepository("facebook", "react");

      expect(result).toStrictEqual({ data: mockRepository, error: null });
      expect(mockBffGet).toHaveBeenCalledWith({
        param: { owner: "facebook", repo: "react" },
      });
    });
  });

  describe("異常系", () => {
    it("APIレスポンスがエラーの場合、エラーを返すこと", async () => {
      mockBffGet.mockResolvedValue({
        ok: false,
        json: async () => ({ error: "エラーが発生しました" }),
      });

      const result = await getRepository("facebook", "react");

      expect(result).toStrictEqual({
        data: null,
        error: "エラーが発生しました",
      });
    });

    it("バリデーションエラーの場合、エラーを返すこと", async () => {
      const invalidData = { ...mockRepository, id: "invalid" };
      mockBffGet.mockResolvedValue({
        ok: true,
        json: async () => invalidData,
      });

      const result = await getRepository("facebook", "react");

      expect(result).toStrictEqual({
        data: null,
        error: "データの形式が不正です",
      });
    });
  });
});
