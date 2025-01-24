/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI-CONTENT-GENERATOR_owner:npg_56FNzgUITLVO@ep-dark-sky-a8cqflb1.eastus2.azure.neon.tech/AI-CONTENT-GENERATOR?sslmode=require",
  },
};
