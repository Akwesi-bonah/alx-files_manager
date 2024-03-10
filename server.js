import express from 'express';
const route = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(route);
app.use(express.json());

app.listent(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

