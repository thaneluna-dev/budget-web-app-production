import { defineConfig } from "drizzle-kit";
export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_YNd7h4OrqHLD@ep-damp-poetry-afptsnkp-pooler.c-2.us-west-2.aws.neon.tech/expense-tracker?sslmode=require&channel_binding=require'
    }
});