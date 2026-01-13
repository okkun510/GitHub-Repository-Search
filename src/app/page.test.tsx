import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

vi.mock("@/bff/client/repositories/searchRepositories", () => ({
  searchRepositories: vi.fn(),
}));

vi.mock("@/components/ui/organisms/RepositoryList", () => ({
  RepositoryList: vi.fn(() => <div data-testid="repository-list" />),
}));

import { searchRepositories } from "@/bff/client/repositories/searchRepositories";
import { RepositoryList } from "@/components/ui/organisms/RepositoryList";

const mockSearchRepositories = vi.mocked(searchRepositories);

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("正常系", () => {
    it("検索クエリがない場合は空のリストを渡す", async () => {
      render(
        await Home({
          searchParams: Promise.resolve({}),
        })
      );

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          repositories: [],
          totalPage: 0,
          defaultValue: "",
          defaultSort: "best-match",
          hasSearched: false,
        }),
        undefined
      );
      expect(mockSearchRepositories).not.toHaveBeenCalled();
    });

    it("検索クエリがある場合はfetcherを呼び出して結果を渡す", async () => {
      const mockItems = [
        {
          id: 1,
          fullName: "facebook/react",
          description: "A JavaScript library",
          ownerAvatarUrl: "https://example.com/avatar.png",
          stargazersCount: "200k",
          htmlUrl: "https://github.com/facebook/react",
        },
      ];

      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 100, items: mockItems },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react" }),
        })
      );

      expect(mockSearchRepositories).toHaveBeenCalledWith("react", {
        sort: undefined,
        page: undefined,
        perPage: "30",
      });

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          repositories: mockItems,
          totalPage: 4,
          defaultValue: "react",
          hasSearched: true,
        }),
        undefined
      );
    });

    it("sortパラメータをfetcherに渡す", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 0, items: [] },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react", sort: "stars" }),
        })
      );

      expect(mockSearchRepositories).toHaveBeenCalledWith("react", {
        sort: "stars",
        page: undefined,
        perPage: "30",
      });

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultSort: "stars",
        }),
        undefined
      );
    });

    it("pageパラメータをfetcherに渡す", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 0, items: [] },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react", page: "2" }),
        })
      );

      expect(mockSearchRepositories).toHaveBeenCalledWith("react", {
        sort: undefined,
        page: "2",
        perPage: "30",
      });
    });

    it("currentHrefにクエリとsortを含める", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 0, items: [] },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react hooks", sort: "forks" }),
        })
      );

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          currentHref: "/?q=react%20hooks&sort=forks",
        }),
        undefined
      );
    });

    it("totalCountが30で割り切れる場合のtotalPage計算", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 90, items: [] },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react" }),
        })
      );

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          totalPage: 3,
        }),
        undefined
      );
    });

    it("totalCountが30で割り切れない場合は切り上げ", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: { totalCount: 91, items: [] },
        error: null,
      });

      render(
        await Home({
          searchParams: Promise.resolve({ q: "react" }),
        })
      );

      expect(RepositoryList).toHaveBeenCalledWith(
        expect.objectContaining({
          totalPage: 4,
        }),
        undefined
      );
    });
  });

  describe("異常系", () => {
    it("fetcherがエラーを返した場合はエラーメッセージを表示", async () => {
      mockSearchRepositories.mockResolvedValue({
        data: null,
        error: "エラーが発生しました",
      });

      const { getByText } = render(
        await Home({
          searchParams: Promise.resolve({ q: "react" }),
        })
      );

      expect(getByText("エラーが発生しました")).toBeTruthy();
      expect(RepositoryList).not.toHaveBeenCalled();
    });
  });
});
