import { Request, Response, NextFunction } from "express";
import redisClient from "../config/redisClient";

const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheKey = req.originalUrl;
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Redis error", error);
    next(); // Continue without caching in case of error
  }
};

export default cacheMiddleware;

/*
run: docker run --name redis -p 6379:6379 -d redis

use:
in controllers
  Store the data in Redis cache with a 1-hour expiration
  import redisClient from '../config/redisClient';

    await redisClient.set(req.originalUrl, JSON.stringify(data), {
        EX: 3600, // Expire after 3600 seconds (1 hour)
    });

in routes
add cacheMiddleware after the endpoint
*/
