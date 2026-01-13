import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "@/bff";

vi.mock("@/app/api/infrastructure/github", () => ({
  gitHubRepository: {
    get: vi.fn(),
    search: vi.fn(),
  },
}));

import { gitHubRepository } from "@/app/api/infrastructure/github";

const mockGetRepository = vi.mocked(gitHubRepository.get);

describe("GET /api/repositories/:owner/:repo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("リポジトリ情報を正しい形式で返す", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        fullName: "facebook/react",
        description: "A JavaScript library",
        owner: { avatarUrl: "https://example.com/avatar.png" },
        stars: 200000,
        watchers: 150000,
        forks: 40000,
        openIssues: 1000,
        language: "JavaScript",
        license: "MIT License",
        createdAt: "2013-05-24T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        htmlUrl: "https://github.com/facebook/react",
      });

      const res = await app.request("/api/repositories/facebook/react");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual({
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
      });
    });

    it("licenseがnullの場合はnullを返す", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        fullName: "user/repo",
        description: null,
        owner: { avatarUrl: "https://example.com/avatar.png" },
        stars: 100,
        watchers: 100,
        forks: 10,
        openIssues: 5,
        language: null,
        license: null,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        htmlUrl: "https://github.com/user/repo",
      });

      const res = await app.request("/api/repositories/user/repo");

      const json = await res.json();
      expect(json.license).toBeNull();
      expect(json.language).toBeNull();
      expect(json.description).toBeNull();
    });

    it("ownerとrepoでgetRepositoryを呼び出す", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        fullName: "vercel/next.js",
        description: "The React Framework",
        owner: { avatarUrl: "https://example.com/avatar.png" },
        stars: 100000,
        watchers: 100000,
        forks: 25000,
        openIssues: 2000,
        language: "TypeScript",
        license: "MIT License",
        createdAt: "2016-10-25T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        htmlUrl: "https://github.com/vercel/next.js",
      });

      await app.request("/api/repositories/vercel/next.js");

      expect(mockGetRepository).toHaveBeenCalledWith("vercel", "next.js");
    });

    it("1000未満の数値はそのまま表示", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        fullName: "user/repo",
        description: null,
        owner: { avatarUrl: "https://example.com/avatar.png" },
        stars: 500,
        watchers: 300,
        forks: 50,
        openIssues: 10,
        language: null,
        license: null,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        htmlUrl: "https://github.com/user/repo",
      });

      const res = await app.request("/api/repositories/user/repo");

      const json = await res.json();
      expect(json.stargazersCount).toBe("500");
      expect(json.watchersCount).toBe("300");
      expect(json.forksCount).toBe("50");
      expect(json.openIssuesCount).toBe("10");
    });
  });

  describe("異常系", () => {
    it("404エラーの場合はエラーを返す", async () => {
      mockGetRepository.mockRejectedValue(new Error("リポジトリが見つかりません"));

      const res = await app.request("/api/repositories/unknown/repo");

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json).toEqual({ error: "リポジトリが見つかりません" });
    });

    it("403エラーの場合はレート制限エラーを返す", async () => {
      mockGetRepository.mockRejectedValue(
        new Error("GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。")
      );

      const res = await app.request("/api/repositories/user/repo");

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json).toEqual({
        error: "GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。",
      });
    });
  });
});
