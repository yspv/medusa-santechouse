import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import path from "path";
import { Context, OrderTypes } from "@medusajs/framework/types";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  admin: {
    vite: () => ({
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src/admin"),
        },
      },
    }),
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  featureFlags: {
    index_engine: false,
  },
  modules: [
    {
      resolve: "./src/modules/brand",
    },
    {
      resolve: "./src/modules/cashback",
    },
    {
      resolve: "./src/modules/price-conversion",
    },
    {
      resolve: "@medusajs/medusa/caching",
      options: {
        providers: [
          {
            resolve: "@medusajs/caching-redis",
            id: "caching-redis",
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            is_default: true,
            options: {
              redisUrl: process.env.REDIS_URL,
            },
          },
        ],
      },
    },
  ],
});
