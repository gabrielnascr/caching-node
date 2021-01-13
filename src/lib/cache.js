import Redis from "ioredis";

class Cache {
  constructor() {
    this.redis = new Redis({
      host: "127.0.0.1",
      port: 6379,

    });
  }

  async get(key) {
    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value, timeExp) {
    return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
  }

  del(key) {
    return this.redis.del(key);
  }
}

export default new Cache();
