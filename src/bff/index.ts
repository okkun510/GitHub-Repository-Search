import { Hono } from "hono";
import { errorHandler } from "./errors/errorHandler";
import repositories from "./routes/repositories";

export const app = new Hono()
  .basePath("/api")
  .route("/repositories", repositories)
  .onError(errorHandler);
