import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import RepositoryPage from "./page";

vi.mock("@/app/api/fetchers/repositories/getRepository", () => ({
  getRepository: vi.fn(),
}));

vi.mock("@/components/ui/organisms/Repository", () => ({
  Repository: vi.fn(() => <div data-testid="repository" />),
}));

import { getRepository } from "@/app/api/fetchers/repositories/getRepository";
import { Repository } from "@/components/ui/organisms/Repository";

const mockGetRepository = vi.mocked(getRepository);

describe("RepositoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("リポジトリ情報をRepositoryコンポーネントに渡す", async () => {
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

      mockGetRepository.mockResolvedValue({
        data: mockRepository,
        error: null,
      });

      render(
        await RepositoryPage({
          params: Promise.resolve({ owner: "facebook", repo: "react" }),
        })
      );

      expect(mockGetRepository).toHaveBeenCalledWith("facebook", "react");
      expect(Repository).toHaveBeenCalledWith(
        expect.objectContaining({
          repository: mockRepository,
        }),
        undefined
      );
    });

    it("paramsのowner/repoをfetcherに渡す", async () => {
      mockGetRepository.mockResolvedValue({
        data: {
          id: 1,
          fullName: "vercel/next.js",
          description: null,
          ownerAvatarUrl: "https://example.com/avatar.png",
          stargazersCount: "100k",
          watchersCount: "100k",
          forksCount: "25k",
          openIssuesCount: "2.0k",
          language: "TypeScript",
          license: "MIT License",
          createdAt: "2016年10月25日",
          updatedAt: "2024年1月1日",
          htmlUrl: "https://github.com/vercel/next.js",
        },
        error: null,
      });

      render(
        await RepositoryPage({
          params: Promise.resolve({ owner: "vercel", repo: "next.js" }),
        })
      );

      expect(mockGetRepository).toHaveBeenCalledWith("vercel", "next.js");
    });
  });

  describe("異常系", () => {
    it("fetcherがエラーを返した場合はエラーメッセージを表示", async () => {
      mockGetRepository.mockResolvedValue({
        data: null,
        error: "エラーが発生しました",
      });

      const { getByText } = render(
        await RepositoryPage({
          params: Promise.resolve({ owner: "unknown", repo: "repo" }),
        })
      );

      expect(getByText("エラーが発生しました")).toBeTruthy();
      expect(Repository).not.toHaveBeenCalled();
    });
  });
});
