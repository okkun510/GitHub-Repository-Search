import { Hono } from "hono";
import { z } from "zod";
import { searchRepositories } from "@/lib/github/searchRepositories";
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

  const result = await searchRepositories({
    query,
    sort,
    order,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
  });

  return c.json({
    totalCount: result.total_count,
    items: result.items.map((item) => ({
      id: item.id,
      fullName: item.full_name,
      description: item.description,
      ownerAvatarUrl: item.owner.avatar_url,
      stargazersCount: formatCount(item.stargazers_count),
      htmlUrl: item.html_url,
    })),
  });
});

export default app;
