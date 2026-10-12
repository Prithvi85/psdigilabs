import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local and in Vercel environment variables."
  );
}

const config = defineConfig({
  name: "psdigilabs",
  title: "PSDigiLabs",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
});

export default config;