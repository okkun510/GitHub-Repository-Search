const GITHUB_API_BASE = "https://api.github.com";

type GitHubRepository = {
  id: number;
  full_name: string;
  description: string | null;
  owner: {
    avatar_url: string;
  };
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  license: {
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
  html_url: string;
};

export type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
};

export type SearchRepositoriesParams = {
  query: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  order?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export const searchRepositories = async ({
  query,
  sort = "stars",
  order = "desc",
  page = 1,
  perPage = 30,
}: SearchRepositoriesParams): Promise<SearchRepositoriesResponse> => {
  const params = new URLSearchParams({
    q: query,
    sort,
    order,
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(
    `${GITHUB_API_BASE}/search/repositories?${params}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。"
      );
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
};
