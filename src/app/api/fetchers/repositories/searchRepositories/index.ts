import { z } from "zod";
import { bffClient } from "../../bffClient";
import { responseSchema } from "../../../[[...route]]/repositories/list";

type Options = {
  sort?: string;
  page?: string;
  perPage?: string;
};

type SearchResult = z.infer<typeof responseSchema>;

type SearchRepositoriesResult =
  | { data: SearchResult; error: null }
  | { data: null; error: string };

export const searchRepositories = async (
  query: string,
  options?: Options
): Promise<SearchRepositoriesResult> => {
  const res = await bffClient.api.repositories.$get({
    query: {
      query,
      perPage: options?.perPage ?? "30",
      ...(options?.sort && { sort: options.sort }),
      ...(options?.page && { page: options.page }),
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
