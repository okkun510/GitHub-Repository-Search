import { hc } from "hono/client";
import type { app } from "../[[...route]]";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const bffClient = hc<typeof app>(baseUrl);
