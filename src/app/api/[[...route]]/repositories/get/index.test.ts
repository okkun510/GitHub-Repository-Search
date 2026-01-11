import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../../index";

vi.mock("@/lib/github/getRepository", () => ({
  getRepository: vi.fn(),
}));

import { getRepository } from "@/lib/github/getRepository";

const mockGetRepository = vi.mocked(getRepository);

describe("GET /api/repositories/:owner/:repo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("リポジトリ情報を正しい形式で返す", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        full_name: "facebook/react",
        description: "A JavaScript library",
        owner: { avatar_url: "https://example.com/avatar.png" },
        stargazers_count: 200000,
        watchers_count: 150000,
        forks_count: 40000,
        open_issues_count: 1000,
        language: "JavaScript",
        license: { name: "MIT License" },
        created_at: "2013-05-24T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/facebook/react",
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
        full_name: "user/repo",
        description: null,
        owner: { avatar_url: "https://example.com/avatar.png" },
        stargazers_count: 100,
        watchers_count: 100,
        forks_count: 10,
        open_issues_count: 5,
        language: null,
        license: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/user/repo",
      });

      const res = await app.request("/api/repositories/user/repo");

      const json = await res.json();
      expect(json.license).toBeNull();
      expect(json.language).toBeNull();
      expect(json.description).toBeNull();
    });

    it("ownerとrepoをgetRepositoryに渡す", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        full_name: "vercel/next.js",
        description: "The React Framework",
        owner: { avatar_url: "https://example.com/avatar.png" },
        stargazers_count: 100000,
        watchers_count: 100000,
        forks_count: 25000,
        open_issues_count: 2000,
        language: "TypeScript",
        license: { name: "MIT License" },
        created_at: "2016-10-25T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/vercel/next.js",
      });

      await app.request("/api/repositories/vercel/next.js");

      expect(mockGetRepository).toHaveBeenCalledWith("vercel", "next.js");
    });

    it("1000未満の数値はそのまま表示", async () => {
      mockGetRepository.mockResolvedValue({
        id: 1,
        full_name: "user/repo",
        description: null,
        owner: { avatar_url: "https://example.com/avatar.png" },
        stargazers_count: 500,
        watchers_count: 300,
        forks_count: 50,
        open_issues_count: 10,
        language: null,
        license: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/user/repo",
      });

      const res = await app.request("/api/repositories/user/repo");

      const json = await res.json();
      expect(json.stargazersCount).toBe("500");
      expect(json.watchersCount).toBe("300");
      expect(json.forksCount).toBe("50");
      expect(json.openIssuesCount).toBe("10");
    });
  });
});
