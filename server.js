import express from 'express';
import allRoutes from './routes/index';

const server = express();
const PORT = process.env.PORT || 5000;

allRoutes(server);

export default server;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```