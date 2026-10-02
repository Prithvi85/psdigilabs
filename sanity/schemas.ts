import { defineArrayMember, defineField, defineType } from "sanity";

const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "order", type: "number" }),
    defineField({ name: "icon", type: "string", options: { list: ["web", "mobile", "test", "automation"] } }),
    defineField({ name: "description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "capabilities", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "technology", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "faqs",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "answer", type: "text", validation: (rule) => rule.required() }),
        ],
      })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const caseStudySchema = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Project name", type: "string", validation: (rule) => rule.required() }),
    defineField({ ...slugField, name: "slug", options: { source: "name", maxLength: 96 } }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "category", type: "string" }),
    imageField,
    defineField({ name: "website", type: "url" }),
    defineField({ name: "intro", title: "Context", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "challenge", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "delivery", title: "Solution / delivery", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "result", title: "Outcome (verified only)", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "technology", type: "text" }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "image" } },
});

export const resourceSchema = defineType({
  name: "resource",
  title: "Resource article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "category", type: "string" }),
    defineField({ name: "summary", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "readTime", title: "Reading time", type: "string" }),
    defineField({ name: "published", type: "date" }),
    defineField({
      name: "sections",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
        ],
      })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});

export const schemaTypes = [serviceSchema, caseStudySchema, resourceSchema];