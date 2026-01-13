import {
  fetchRepository,
  fetchSearchRepositories,
  type SearchParams,
} from "../data-access";

export type Repository = {
  id: number;
  fullName: string;
  description: string | null;
  owner: {
    avatarUrl: string;
  };
  stars: number;
  watchers: number;
  forks: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  createdAt: string;
  updatedAt: string;
  htmlUrl: string;
};

export type RepositoryListItem = {
  id: number;
  fullName: string;
  description: string | null;
  owner: {
    avatarUrl: string;
  };
  stars: number;
  htmlUrl: string;
};

export type SearchResult = {
  totalCount: number;
  items: RepositoryListItem[];
};

export type { SearchParams };

export const gitHubRepository = {
  get: async (owner: string, repo: string): Promise<Repository> => {
    const raw = await fetchRepository(owner, repo);

    return {
      id: raw.id,
      fullName: raw.full_name,
      description: raw.description,
      owner: { avatarUrl: raw.owner.avatar_url },
      stars: raw.stargazers_count,
      watchers: raw.watchers_count,
      forks: raw.forks_count,
      openIssues: raw.open_issues_count,
      language: raw.language,
      license: raw.license?.name ?? null,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      htmlUrl: raw.html_url,
    };
  },

  search: async (params: SearchParams): Promise<SearchResult> => {
    const raw = await fetchSearchRepositories(params);

    return {
      totalCount: raw.total_count,
      items: raw.items.map((item) => ({
        id: item.id,
        fullName: item.full_name,
        description: item.description,
        owner: { avatarUrl: item.owner.avatar_url },
        stars: item.stargazers_count,
        htmlUrl: item.html_url,
      })),
    };
  },
};
