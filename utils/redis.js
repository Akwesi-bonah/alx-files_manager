const redis = require("redis");
const { promisify } = require("util");

class RedisClient {
  // initial connection to the server
  constructor() {
    this.client = redis.createClient();

    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on("error", (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
    });
  }

  // check if the server is alive
  isAlive() {
    return this.client.connected;
  }
  // get value
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }
  // set value
  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  // delete
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
