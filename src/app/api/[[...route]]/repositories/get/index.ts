import { Hono } from "hono";
import { z } from "zod";
import { getRepository } from "@/lib/github/getRepository";
import { formatCount, formatDate } from "../utils";

export const responseSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  description: z.string().nullable(),
  ownerAvatarUrl: z.string(),
  stargazersCount: z.string(),
  watchersCount: z.string(),
  forksCount: z.string(),
  openIssuesCount: z.string(),
  language: z.string().nullable(),
  license: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  htmlUrl: z.string(),
});

const app = new Hono<{ Variables: { owner: string; repo: string } }>().get(
  "/",
  async (c) => {
    const owner = c.req.param("owner") as string;
    const repo = c.req.param("repo") as string;

    const result = await getRepository(owner, repo);

    return c.json({
      id: result.id,
      fullName: result.full_name,
      description: result.description,
      ownerAvatarUrl: result.owner.avatar_url,
      stargazersCount: formatCount(result.stargazers_count),
      watchersCount: formatCount(result.watchers_count),
      forksCount: formatCount(result.forks_count),
      openIssuesCount: formatCount(result.open_issues_count),
      language: result.language,
      license: result.license?.name ?? null,
      createdAt: formatDate(result.created_at),
      updatedAt: formatDate(result.updated_at),
      htmlUrl: result.html_url,
    });
  }
);

export default app;
