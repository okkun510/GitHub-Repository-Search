import { searchRepositories } from "@/bff/client/repositories/searchRepositories";
import { RepositoryList } from "@/components/ui/organisms/RepositoryList";

const PER_PAGE = 30;

type Props = {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { q: query, sort, page } = await searchParams;

  const result = query
    ? await searchRepositories(query, { sort, page, perPage: String(PER_PAGE) })
    : null;

  if (result?.error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{result.error}</p>
      </div>
    );
  }

  return (
    <RepositoryList
      repositories={result?.data?.items ?? []}
      totalPage={result?.data ? Math.ceil(result.data.totalCount / PER_PAGE) : 0}
      defaultValue={query ?? ""}
      defaultSort={sort ?? "best-match"}
      currentHref={`/?q=${encodeURIComponent(query ?? "")}&sort=${sort ?? "best-match"}`}
      hasSearched={!!query}
    />
  );
}
