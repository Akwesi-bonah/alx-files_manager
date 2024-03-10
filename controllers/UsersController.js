import sha1 from 'sha1';
import DBClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    try {
      const { email, password } = request.body;

      // Check for missing email or password
      if (!email) {
        return response.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return response.status(400).json({ error: 'Missing password' });
      }

      // Check if the email already exists in the database
      const existingUser = await DBClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return response.status(400).json({ error: 'User already exists' });
      }

      // Hash the password using SHA1
      const hashedPassword = sha1(password);

      // Insert the new user into the database
      const result = await DBClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });

      // Return the new user with only email and id
      const createdUser = {
        id: result.insertedId,
        email,
      };

      return response.status(201).json(createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
