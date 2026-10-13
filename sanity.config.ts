import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aqs984m5";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const config = defineConfig({
  name: "psdigilabs",
  title: "PSDigiLabs Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

export default config;