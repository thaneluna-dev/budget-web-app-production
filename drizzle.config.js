import { defineConfig } from "drizzle-kit";
export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_YNd7h4OrqHLD@ep-square-breeze-afkr2da7-pooler.c-2.us-west-2.aws.neon.tech/Expense%20App?sslmode=require&channel_binding=require'
    }
});