import { createClient, print } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.con = true;

    this.client.connect();
    this.client.on('connect', () => {
      this.con = true;
    });

    this.client.on('error', (err) => {
      console.log(
        'Redis client did not connect to the server:',
        err.message || err.toString()
      );
      this.con = false;
    });
  }

  isAlive() {
    return this.con;
  }

  async get(key) {
    return this.client.get(key, print);
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
