import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const config = defineConfig({
  name: "psdigilabs",
  title: "PSDigiLabs",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "psdigilabs",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  schema: { types: schemaTypes },
});

export default config;