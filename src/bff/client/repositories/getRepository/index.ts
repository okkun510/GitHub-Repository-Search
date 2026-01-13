import { z } from "zod";
import { bffClient } from "@/bff/client";
import { responseSchema } from "@/bff/routes/repositories/get";

type RepositoryData = z.infer<typeof responseSchema>;

type GetRepositoryResult =
  | { data: RepositoryData; error: null }
  | { data: null; error: string };

export const getRepository = async (
  owner: string,
  repo: string
): Promise<GetRepositoryResult> => {
  const res = await bffClient.api.repositories[":owner"][":repo"].$get({
    param: { owner, repo },
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
