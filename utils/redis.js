import { createClient} from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on("error", (error) => {
      console.log(
        "Redis client did not connect to the server:",
        error.toString()
      );
      this.connection = false;
    });
    this.connection = false;
    this.client.on("connect", () => {
      this.connection = true;
    });
  }

  isAlive() {
    return this.connection;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)
    (key, duration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisclient = new RedisClient();
export default redisclient;
