import monogdb from "mongodb";

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || "localhost";
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || "files_manager";
    this.client = new monogdb.MongoClient(
      `mongodb://${this.host}:${this.port}/${this.database}`,
      { useUnifiedTopology: true }
    );
    this.client.connect();
  }
  isAlive() {
    return this.client.isConnected();
  }

  async nbusers() {
    const db = this.client.db(this.database);
    const users = db.collection("users");
    return users.countDocuments();
  }

  async nbFiles() {
    const db = this.client.db(this.database);
    const files = db.collection("files");
    return files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
