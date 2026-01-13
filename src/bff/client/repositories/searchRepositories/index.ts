import { z } from "zod";
import { bffClient } from "@/bff/client";
import { responseSchema } from "@/bff/routes/repositories/list";

type Options = {
  sort?: string;
  page?: string;
  perPage?: string;
};

const DEFAULT_PER_PAGE = "30";

type SearchResult = z.infer<typeof responseSchema>;

type SearchRepositoriesResult =
  | { data: SearchResult; error: null }
  | { data: null; error: string };

export const searchRepositories = async (
  query: string,
  { sort, page, perPage = DEFAULT_PER_PAGE }: Options = {}
): Promise<SearchRepositoriesResult> => {
  const res = await bffClient.api.repositories.$get({
    query: {
      query,
      perPage,
      ...(sort && { sort }),
      ...(page && { page }),
    },
  });

  if (!res.ok) {
    const errorData = (await res.json()) as { error?: string };
    return { data: null, error: errorData.error ?? "エラーが発生しました" };
  }

  const data = await res.json();
  const parsed = responseSchema.safeParse(data);

  if (!parsed.success) {
    return { data: null, error: "データの形式が不正です" };
  }

  return { data: parsed.data, error: null };
};
