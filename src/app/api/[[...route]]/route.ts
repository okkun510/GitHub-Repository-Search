import { handle } from "hono/vercel";
import { app } from ".";

export const maxDuration = 120;

export type BffType = typeof app;

export const GET = handle(app);
