/* eslint-disable import/no-named-as-default */
import RedisClient from '../utils/redis';
import DBClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    const data = {
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    };
    return res.status(200).json(data);
  }

  static async getStats(_req, res) {
    const data = {
      users: await DBClient.nbUsers(),
      files: await DBClient.nbFiles(),
    };
    return res.status(200).json(data);
  }
}

module.exports = AppController;
