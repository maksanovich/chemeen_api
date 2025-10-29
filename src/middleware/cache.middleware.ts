import { Request, Response, NextFunction } from 'express';

// Simple in-memory cache for frequently accessed data
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const cacheMiddleware = (keyGenerator: (req: Request) => string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const cacheKey = keyGenerator(req);
        const cached = cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return res.json({
                success: true,
                data: cached.data,
                cached: true
            });
        }
        
        // Store original res.json
        const originalJson = res.json.bind(res);
        
        // Override res.json to cache the response
        res.json = (body: any) => {
            if (res.statusCode === 200 && body.success !== false) {
                cache.set(cacheKey, {
                    data: body,
                    timestamp: Date.now()
                });
            }
            return originalJson(body);
        };
        
        next();
    };
};

// Cache invalidation helper
export const invalidateCache = (pattern: string) => {
    for (const key of cache.keys()) {
        if (key.includes(pattern)) {
            cache.delete(key);
        }
    }
};

// Clear all cache
export const clearCache = () => {
    cache.clear();
};
