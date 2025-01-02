// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { fetchNavigation } from "../utils/fetchNavigation.ts";
import { State } from "../types/navbarItems.ts"

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
): Promise<Response> {
  return await fetchNavigation(req, ctx);
}
