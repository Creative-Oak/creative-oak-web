// utils/fetchNavigation.ts
import { FreshContext } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";
import { State } from "../types/navbarItems.ts";

export async function fetchNavigation(
  _req: Request,
  ctx: FreshContext<State>,
): Promise<Response> {
  const navigationQuery = `
    *[_type == "settings"][0].mainNavigation
  `;

  try {
    const navigation = await client.fetch(navigationQuery);
    ctx.state.navigation = navigation;
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    ctx.state.navigation = [];
  }

  return await ctx.next();
}
