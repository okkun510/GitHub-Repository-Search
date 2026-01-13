import { Hono } from "hono";
import { z } from "zod";
import { gitHubRepository } from "@/app/api/infrastructure/github";
import { formatCount } from "../utils";

const repositoryItemSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  description: z.string().nullable(),
  ownerAvatarUrl: z.string(),
  stargazersCount: z.string(),
  htmlUrl: z.string(),
});

export const responseSchema = z.object({
  totalCount: z.number(),
  items: z.array(repositoryItemSchema),
});

const app = new Hono().get("/", async (c) => {
  const query = c.req.query("query");
  const sort = c.req.query("sort") as
    | "stars"
    | "forks"
    | "help-wanted-issues"
    | "updated"
    | undefined;
  const order = c.req.query("order") as "asc" | "desc" | undefined;
  const page = c.req.query("page");
  const perPage = c.req.query("perPage");

  if (!query) {
    return c.json({ error: "query is required" }, 400);
  }

  try {
    const result = await gitHubRepository.search({
      query,
      sort,
      order,
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    });

    return c.json({
      totalCount: result.totalCount,
      items: result.items.map((item) => ({
        id: item.id,
        fullName: item.fullName,
        description: item.description,
        ownerAvatarUrl: item.owner.avatarUrl,
        stargazersCount: formatCount(item.stars),
        htmlUrl: item.htmlUrl,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "エラーが発生しました";
    if (message.includes("レート制限")) {
      return c.json({ error: message }, 403);
    }
    return c.json({ error: message }, 500);
  }
});

export default app;
