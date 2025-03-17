// utils/sanity.ts
import {
  ClientPerspective,
  createClient,
  SanityClient,
} from "https://esm.sh/@sanity/client@6.24.1";

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token: string;
  useCdn: boolean;
  perspective: ClientPerspective;
}

const config: SanityConfig = {
  projectId: "gt4m5sbb",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: Deno.env.get("SANITY_TOKEN") || "",
  useCdn: true,
  perspective: "published" as ClientPerspective,
};

// Export the client for direct use in routes
export const client: SanityClient = createClient(config);
