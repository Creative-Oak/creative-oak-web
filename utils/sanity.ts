// utils/sanity.ts
import {
  createClient,
  SanityClient,
} from "https://esm.sh/@sanity/client@6.24.1";

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

const config: SanityConfig = {
  projectId: "gt4m5sbb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
};

// Export the client for direct use in routes
export const client: SanityClient = createClient(config);
