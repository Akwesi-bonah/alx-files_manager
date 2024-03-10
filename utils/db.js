import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.connectionString = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.connectionString, { useUnifiedTopology: true });

    this.connect();
  }
  // connect to the database
  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  // check if the server is alive
  isAlive() {
    return this.client.isConnected();
  }

  // get all the documents in a collection
  async nbDocuments(collectionName) {
    try {
      const collection = this.client.db(this.database).collection(collectionName);
      return await collection.countDocuments();
    } catch (error) {
      console.error(`Error counting documents in ${collectionName}:`, error);
      throw error; // Propagate the error for better error handling in the application
    }
  }
  // get the number of users
  async nbUsers() {
    return this.nbDocuments('users');
  }

  // get the number of files
  async nbFiles() {
    return this.nbDocuments('files');
  }
}

const dbClient = new DBClient();
export default dbClient;
