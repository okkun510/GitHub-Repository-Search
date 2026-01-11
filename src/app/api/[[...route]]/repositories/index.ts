import { Hono } from "hono";
import list from "./list";
import get from "./get";

const app = new Hono()
  .route("/", list)
  .route("/:owner/:repo", get);

export default app;
