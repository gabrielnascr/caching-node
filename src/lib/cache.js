import Redis from "ioredis";

class Cache {
  constructor() {
    this.redis = new Redis({
      host: "127.0.0.1",
      port: 6379,
      keyPrefix: "cache:",
    });
  }

  async get(key) {
    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value));
  }

  del(key) {
    return this.redis.del(key);
  }
}

export default new Cache();
