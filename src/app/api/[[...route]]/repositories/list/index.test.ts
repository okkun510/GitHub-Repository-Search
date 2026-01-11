import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../../index";

vi.mock("@/lib/github/searchRepositories", () => ({
  searchRepositories: vi.fn(),
}));

import { searchRepositories } from "@/lib/github/searchRepositories";

const mockSearchRepositories = vi.mocked(searchRepositories);

describe("GET /api/repositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("検索結果を正しい形式で返す", async () => {
      mockSearchRepositories.mockResolvedValue({
        total_count: 100,
        incomplete_results: false,
        items: [
          {
            id: 1,
            full_name: "facebook/react",
            description: "A JavaScript library",
            owner: { avatar_url: "https://example.com/avatar.png" },
            stargazers_count: 200000,
            watchers_count: 200000,
            forks_count: 40000,
            open_issues_count: 1000,
            language: "JavaScript",
            license: { name: "MIT" },
            created_at: "2013-05-24T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            html_url: "https://github.com/facebook/react",
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
        total_count: 0,
        incomplete_results: false,
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
        total_count: 0,
        incomplete_results: false,
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
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 1,
            full_name: "user/repo",
            description: null,
            owner: { avatar_url: "https://example.com/avatar.png" },
            stargazers_count: 500,
            watchers_count: 500,
            forks_count: 10,
            open_issues_count: 5,
            language: null,
            license: null,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            html_url: "https://github.com/user/repo",
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
  });
});
