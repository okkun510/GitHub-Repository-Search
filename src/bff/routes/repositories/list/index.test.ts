import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "@/bff";

vi.mock("@/app/api/infrastructure/github", () => ({
  gitHubRepository: {
    get: vi.fn(),
    search: vi.fn(),
  },
}));

import { gitHubRepository } from "@/app/api/infrastructure/github";

const mockSearchRepositories = vi.mocked(gitHubRepository.search);

describe("GET /api/repositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("検索結果を正しい形式で返す", async () => {
      mockSearchRepositories.mockResolvedValue({
        totalCount: 100,
        items: [
          {
            id: 1,
            fullName: "facebook/react",
            description: "A JavaScript library",
            owner: { avatarUrl: "https://example.com/avatar.png" },
            stars: 200000,
            htmlUrl: "https://github.com/facebook/react",
          },
        ],
      });

      const res = await app.request("/api/repositories?query=react");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual({
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
      });
    });

    it("sortパラメータを渡す", async () => {
      mockSearchRepositories.mockResolvedValue({
        totalCount: 0,
        items: [],
      });

      await app.request("/api/repositories?query=react&sort=forks");

      expect(mockSearchRepositories).toHaveBeenCalledWith({
        query: "react",
        sort: "forks",
        order: undefined,
        page: undefined,
        perPage: undefined,
      });
    });

    it("pageとperPageパラメータを数値に変換して渡す", async () => {
      mockSearchRepositories.mockResolvedValue({
        totalCount: 0,
        items: [],
      });

      await app.request("/api/repositories?query=react&page=2&perPage=10");

      expect(mockSearchRepositories).toHaveBeenCalledWith({
        query: "react",
        sort: undefined,
        order: undefined,
        page: 2,
        perPage: 10,
      });
    });

    it("stargazersCountが1000未満の場合はそのまま表示", async () => {
      mockSearchRepositories.mockResolvedValue({
        totalCount: 1,
        items: [
          {
            id: 1,
            fullName: "user/repo",
            description: null,
            owner: { avatarUrl: "https://example.com/avatar.png" },
            stars: 500,
            htmlUrl: "https://github.com/user/repo",
          },
        ],
      });

      const res = await app.request("/api/repositories?query=test");

      const json = await res.json();
      expect(json.items[0].stargazersCount).toBe("500");
    });
  });

  describe("異常系", () => {
    it("queryがない場合は400エラーを返す", async () => {
      const res = await app.request("/api/repositories");

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({ error: "query is required" });
    });

    it("403エラーの場合はレート制限エラーを返す", async () => {
      mockSearchRepositories.mockRejectedValue(
        new Error("GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。")
      );

      const res = await app.request("/api/repositories?query=react");

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json).toEqual({
        error: "GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。",
      });
    });
  });
});
