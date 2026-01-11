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

export type GetRepositoryResponse = GitHubRepository;

export const getRepository = async (
  owner: string,
  repo: string
): Promise<GetRepositoryResponse> => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
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
