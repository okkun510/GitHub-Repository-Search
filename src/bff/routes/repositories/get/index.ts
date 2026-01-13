import { Hono } from "hono";
import { z } from "zod";
import { gitHubRepository } from "@/app/api/infrastructure/github";
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

    try {
      const repository = await gitHubRepository.get(owner, repo);

      return c.json({
        id: repository.id,
        fullName: repository.fullName,
        description: repository.description,
        ownerAvatarUrl: repository.owner.avatarUrl,
        stargazersCount: formatCount(repository.stars),
        watchersCount: formatCount(repository.watchers),
        forksCount: formatCount(repository.forks),
        openIssuesCount: formatCount(repository.openIssues),
        language: repository.language,
        license: repository.license,
        createdAt: formatDate(repository.createdAt),
        updatedAt: formatDate(repository.updatedAt),
        htmlUrl: repository.htmlUrl,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "エラーが発生しました";
      if (message.includes("見つかりません")) {
        return c.json({ error: message }, 404);
      }
      if (message.includes("レート制限")) {
        return c.json({ error: message }, 403);
      }
      return c.json({ error: message }, 500);
    }
  }
);

export default app;
