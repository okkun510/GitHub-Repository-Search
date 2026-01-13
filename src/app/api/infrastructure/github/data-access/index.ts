export type GitHubRepositoryRaw = {
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

export type SearchRepositoriesRawResponse = {
  total_count: number;
  items: GitHubRepositoryRaw[];
};

export type SearchParams = {
  query: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  order?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export const fetchRepository = async (
  owner: string,
  repo: string
): Promise<GitHubRepositoryRaw> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers: { Accept: "application/vnd.github+json" } }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。");
    }
    if (response.status === 404) {
      throw new Error("リポジトリが見つかりません");
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
};

export const fetchSearchRepositories = async (
  params: SearchParams
): Promise<SearchRepositoriesRawResponse> => {
  const urlParams = new URLSearchParams({
    q: params.query,
    sort: params.sort ?? "stars",
    order: params.order ?? "desc",
    page: String(params.page ?? 1),
    per_page: String(params.perPage ?? 30),
  });

  const response = await fetch(
    `https://api.github.com/search/repositories?${urlParams}`,
    { headers: { Accept: "application/vnd.github+json" } }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub APIのレート制限に達しました。しばらく待ってから再度お試しください。");
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
};
