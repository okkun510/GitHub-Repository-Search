import { handle } from "hono/vercel";
import { app } from "@/bff";

export const maxDuration = 120;

export const GET = handle(app);
