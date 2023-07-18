import { createClient } from "redis";

export const redis = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redis.on("error", (error) => console.log("Redis Client Error", error));
